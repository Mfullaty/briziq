# Role-Based Access Control (RBAC)

AgriHype Dashboard implements **role-based access control** on top of NextAuth sessions using a simple `authority` (roles) array. RBAC is enforced in two places:

- **Routing & middleware** – decides whether a signed-in user can access a route.
- **Navigation & UI** – decides whether to show or hide specific navigation items or UI sections.

This document explains how RBAC works end-to-end and how to configure it.

---

## Authority Model

### `authority` on the user

User roles are represented by a string array named `authority`:

```ts
// src/@types/auth.ts
export type User = {
    userId?: string | null
    avatar?: string | null
    userName?: string | null
    email?: string | null
    authority?: string[]
}

export type SignInResponse = {
    token: string
    user: {
        userId: string
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}
```

- **Type:** `string[]` (e.g. `['admin', 'user']`).
- **Optional on `User`** for flexibility.
- **Required in `SignInResponse.user`** for sign-in flows.

In NextAuth’s module augmentation, the session user is extended to include `authority`:

```ts
// src/@types/next-auth.d.ts
import 'next-auth'
import type { User as AppUser } from '@/@types/auth'

declare module 'next-auth' {
    interface Session {
        user:
            | (DefaultSession['user'] & {
                  id?: string | null
                  authority?: string[]
              })
            | null
    }

    interface User extends AppUser {}
}
```

### Populating roles in the session

Roles are attached to the NextAuth session in the `session` callback:

```ts
// src/configs/auth.config.ts
export default {
    providers: [
        /* Github, Google, Credentials, ... */
    ],
    callbacks: {
        async session(payload) {
            // Apply extra user attributes such as `authority` & `id`
            return {
                ...payload.session,
                user: {
                    ...payload.session.user,
                    id: payload.token.sub,
                    authority: ['admin', 'user'],
                },
            }
        },
    },
} satisfies NextAuthConfig
```

In the template, every session is given `['admin', 'user']` as a starting point. In a real app, you should:

- Fetch the user’s roles from your database or API during sign-in.
- Map them into the `authority` array in this callback.

### Example mock data

Mock auth data also uses `authority` consistently:

```ts
// src/mock/data/authData.ts
export const signInUserData = [
    {
        id: '21',
        avatar: '',
        userName: 'John Doe',
        email: 'admin@agrihype.com',
        authority: ['admin', 'user'],
        password: 'admin123@Xy',
        accountUserName: 'admin',
    },
]
```

---

## Route-Level RBAC (Middleware)

### Route categories

Routes are categorized with metadata in `src/configs/routes.config/routes.config.ts`:

```ts
// src/configs/routes.config/routes.config.ts
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const protectedRoutes: Routes = {
    '/dashboard': {
        key: 'dashboard',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
}

export const publicRoutes: Routes = {
    '/': {
        key: 'home',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
}

export const authRoutes = authRoute
```

`authRoutes` are defined separately in `authRoute.ts` for sign-in related pages.

Each route entry includes an `authority` array:

- **Empty array (`[]`) or undefined `authority`**: no role-based restriction is applied. The route is still protected by authentication, but middleware will not perform a role check.
- **Non-empty array**: only users whose `authority` intersects this array can access.

> Note: Middleware only enforces RBAC when a route’s `authority` array contains one or more roles. Empty or missing `authority` is treated as “no RBAC”.

### Middleware logic

The core RBAC enforcement lives in `src/middleware.ts` using NextAuth’s `auth` wrapper:

```ts
// src/middleware.ts
import NextAuth from 'next-auth'

import authConfig from '@/configs/auth.config'
import {
    authRoutes as _authRoutes,
    publicRoutes as _publicRoutes,
    protectedRoutes,
} from '@/configs/routes.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'

const { auth } = NextAuth(authConfig)

const publicRoutes = Object.entries(_publicRoutes).map(([key]) => key)
const authRoutes = Object.entries(_authRoutes).map(([key]) => key)

const apiAuthPrefix = `${appConfig.apiPrefix}/auth`

export default auth((req) => {
    const { nextUrl } = req
    const isSignedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    // Skip auth middleware for API auth routes and public routes
    if (isApiAuthRoute || isPublicRoute) return

    // If user visits auth routes while signed in, redirect to authenticated entry path
    if (isAuthRoute) {
        if (isSignedIn) {
            return Response.redirect(
                new URL(appConfig.authenticatedEntryPath, nextUrl),
            )
        }
        return
    }

    // If NOT signed in and route is not public, redirect to unauthenticated entry path
    if (!isSignedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        return Response.redirect(
            new URL(
                `${appConfig.unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${callbackUrl}`,
                nextUrl,
            ),
        )
    }

    /** Role based access: only enforce when route defines required roles in `authority` */
    if (isSignedIn && nextUrl.pathname !== '/access-denied') {
        const routeMeta = protectedRoutes[nextUrl.pathname]
        const requiredRoles = routeMeta?.authority

        if (Array.isArray(requiredRoles) && requiredRoles.length > 0) {
            const userRoles = req.auth?.user?.authority ?? []
            const includedRole = requiredRoles.some((role) =>
                userRoles.includes(role),
            )

            if (!includedRole) {
                return Response.redirect(new URL('/access-denied', nextUrl))
            }
        }
    }
})

export const config = {
    matcher: ['/((?!.+\.[\w]+$|_next).*)', '/', '/(api)(.*)'],
}
```

**Flow summary:**

- **Public routes**: listed in `publicRoutes`. Middleware does not enforce auth or roles.
- **Auth routes**: `authRoutes` (e.g. `/sign-in`, `/sign-up`, etc.).
    - If already signed in → redirect to `appConfig.authenticatedEntryPath`.
- **Protected routes**:
    - If unauthenticated → redirect to `appConfig.unAuthenticatedEntryPath` with a redirect back.
    - If authenticated:
        - Look up the route’s `authority` from `protectedRoutes[pathname]`.
        - If `authority` is a **non-empty array**, enforce RBAC: the user must have at least one of the required roles or be redirected to `/access-denied`.
        - If `authority` is empty or undefined, **no role check** is performed (the route is auth-only but not role-restricted).

> Important: For the role check to work, you need to keep `protectedRoutes` in sync with your actual routes and assign `authority` correctly.

---

## Navigation & UI-Level RBAC

RBAC is also applied at the UI level to hide or show navigation elements based on roles.

### `NavigationTree.authority`

Navigation items include their own `authority` array:

```ts
// src/@types/navigation.ts
export interface NavigationTree {
    key: string
    path: string
    isExternalLink?: boolean
    title: string
    translateKey: string
    icon: string
    type: 'title' | 'collapse' | 'item'
    authority: string[]
    subMenu: NavigationTree[]
    description?: string
    meta?: {
        horizontalMenu?: HorizontalMenuMeta
        description?: {
            translateKey: string
            label: string
        }
    }
}
```

The navigation configuration documentation describes the semantics:

> **authority** – Display menu items to users who have the roles given. There will be no access block if this field is undefined or an empty array.

### `useAuthority` hook

The reusable hook that checks role intersection is:

```ts
// src/utils/hooks/useAuthority.ts
'use client'

import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'

function useAuthority(
    userAuthority: string[] = [],
    authority: string[] = [],
    emptyCheck = false,
) {
    const roleMatched = useMemo(() => {
        return authority.some((role) => userAuthority.includes(role))
    }, [authority, userAuthority])

    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck
    }

    return roleMatched
}

export default useAuthority
```

Behavior:

- If either `authority` or `userAuthority` is empty/undefined:
    - Returns `!emptyCheck` (by default `true`), meaning **no restriction**.
- If both are non-empty:
    - Returns `true` if **any** role in `authority` exists in `userAuthority`.

### `AuthorityCheck` component

This component wraps UI and only renders children when the user passes the authority check:

```tsx
// src/components/shared/AuthorityCheck.tsx
import useAuthority from '@/utils/hooks/useAuthority'
import type { CommonProps } from '@/@types/common'

interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
}

const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority = [], authority = [], children } = props

    const roleMatched = useAuthority(userAuthority, authority)

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
```

Usage examples:

- **Vertical menu items** (`VerticalSingleMenuItem`):

```tsx
// src/components/template/VerticalMenuContent/VerticalSingleMenuItem.tsx
<AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
    <MenuItem key={nav.key} eventKey={nav.key} dotIndent={indent}>
        {/* link content */}
    </MenuItem>
</AuthorityCheck>
```

- **Collapsed menu groups** (`VerticalCollapsedMenuItem`):

```tsx
// src/components/template/VerticalMenuContent/VerticalCollapsedMenuItem.tsx
<AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
    <MenuCollapse /* ... */>{children}</MenuCollapse>
</AuthorityCheck>
```

- **Menu titles/groups** (`VerticalMenuContent`):

```tsx
// src/components/template/VerticalMenuContent/VerticalMenuContent.tsx
<AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
    <MenuGroup
        key={nav.key}
        label={t(nav.translateKey, nav.title) || nav.title}
    >
        {/* child menu items */}
    </MenuGroup>
</AuthorityCheck>
```

As long as you pass the current user’s roles (`userAuthority`) and configure `nav.authority` correctly, menu items will automatically hide from unauthorized users.

---

## How Everything Fits Together

1. **User signs in** via NextAuth (OAuth or credentials).
2. **Session callback** (`auth.config.ts`) attaches an `authority` array to `session.user`.
3. On the **server side**:
    - `middleware.ts` uses `req.auth.user.authority` and `protectedRoutes[path].authority` to enforce route access.
    - Unauthorized users are redirected to `/access-denied`.
4. On the **client side**:
    - Navigation trees (`NavigationTree`) declare `authority` per item.
    - `AuthorityCheck` + `useAuthority` decide whether a menu item or UI section is rendered.

This ensures that:

- Users cannot access restricted routes even by typing URLs manually (middleware).
- Users do not see UI elements for features they cannot access (navigation & components).

---

## Configuring RBAC

### 1. Define your roles

Decide on the role strings you want to use, e.g.:

- `admin`
- `manager`
- `user`
- `viewer`

### 2. Populate roles in the session

In `src/configs/auth.config.ts`, update the `session` callback to pull real roles from your data source:

```ts
callbacks: {
    async session(payload) {
        const roles = await getRolesForUser(payload.token.sub)

        return {
            ...payload.session,
            user: {
                ...payload.session.user,
                id: payload.token.sub,
                authority: roles, // e.g. ['admin']
            },
        }
    },
}
```

Make sure the returned roles align with `authority` values in your route and navigation configs.

### 3. Protect routes

In `src/configs/routes.config/routes.config.ts`:

- Ensure all URL paths that require auth/roles are present in `protectedRoutes`.
- Set the `authority` array to the roles allowed to access each path.

Example:

```ts
export const protectedRoutes: Routes = {
    '/dashboard': {
        key: 'dashboard',
        authority: ['admin', 'manager'],
        meta: {
            /* ... */
        },
    },
    '/reports': {
        key: 'reports',
        authority: ['admin', 'analyst'],
        meta: {
            /* ... */
        },
    },
}
```

### 4. Configure navigation visibility

When defining navigation items (see `navigation-config.md` for full details), set `authority` for each item or group:

```ts
const navigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '/dashboard',
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: 'home',
        type: 'item',
        authority: ['admin', 'manager'],
        subMenu: [],
    },
]
```

Because the menu components always wrap items with `AuthorityCheck`, unauthorized users will not see those menu entries.

### 5. Optional: Stricter empty-authority handling

By default, `useAuthority` treats empty `authority` or `userAuthority` as **allowed** (`!emptyCheck` → `true`). If you want stricter behavior (e.g. empty means "no access"), you can:

- Pass `emptyCheck = true` when calling `useAuthority` in specific places, **or**
- Adjust the implementation to fit your security requirements.

---

## Summary

- **Roles** are represented as `authority: string[]` on the user/session.
- **Route configs** (`protectedRoutes`, `publicRoutes`, `authRoutes`) define which paths are public, auth, or protected and specify required roles.
- **Middleware** uses `protectedRoutes` + `req.auth.user.authority` to enforce access at the server level.
- **Navigation & UI** use `AuthorityCheck` and `useAuthority` to hide unauthorized items.

Together, these pieces provide a simple but flexible RBAC system that you can adapt to your own roles, resources, and business rules.

Read the map generated by windsurf:
https://windsurf.com/codemaps/0b609176-8abe-4f22-a251-b79629bccf0b-5cf910f506ee069c
