# Authentication

Briziq Dashboard uses NextAuth.js as the authentication solution, offering a robust and flexible way to handle user authentication, it supports custom authentication flows and provides a wide range of authentication providers, including Google, GitHub, and more.

NextAuth relies on environment variables for secure configuration. By default, our template includes the following variables in the .env file:

```
# Authentication Secret
AUTH_SECRET=your-secret-key

# Base URL for NextAuth callbacks
NEXTAUTH_URL=http://localhost:3000

# OAuth Provider (Google)
GOOGLE_AUTH_CLIENT_ID=your-google-client-id
GOOGLE_AUTH_CLIENT_SECRET=GOCSPX-your-google-secret

# OAuth Provider (Github)
GITHUB_AUTH_CLIENT_ID=your-github-client-id
GITHUB_AUTH_CLIENT_SECRET=your-github-secret
```

- **AUTH_SECRET:** A random string used to encrypt session tokens.
- **NEXTAUTH_URL:** The base URL for your application, used in redirect callbacks. Update this in production to match your deployed domain.
- **GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET:** Credentials for integrating with OAuth.

In our template, the NextAuth configuration is centralized in the auth.config.ts file located in src/configs/This file defines the authentication providers and callback handlers to extend session attributes.

## Credentials Provider

The Credentials provider allows custom authentication logic via the authorize method, when the user signs in, the credentials are validated using a backend action validateCredential. If validation passes, the user object is returned; otherwise, null is returned. You can impletment your own user validate logic in validateCredential method, it can be an api call or a database query.

### TypeScript

```ts
import type { NextAuthConfig } from "next-auth";
import validateCredential from "../server/actions/user/validateCredential";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { SignInCredential } from "@/@types/auth";

export default {
    providers: [
        ..., // other providers, e.g., Github, Google
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const user = await validateCredential(credentials as SignInCredential)
                if(!user) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.userName,
                    email: user.email,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async session(payload) {

            /** apply extra user attributes here, for example, we add 'authority' & 'id' in this section */
            return {
                ...payload.session,
                user: {
                  ...payload.session.user,
                  id: payload.token.sub,
                  authority: ['admin', 'user']
                },
            }
        }
    },
} satisfies NextAuthConfig;
```

## JavaScript

```js
import type { NextAuthConfig } from "next-auth";
import validateCredential from "../server/actions/user/validateCredential";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
    providers: [
        ..., // other providers, e.g., Github, Google
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const user = await validateCredential(credentials)
                if(!user) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.userName,
                    email: user.email,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async session(payload) {

            /** apply extra user attributes here, for example, we add 'authority' & 'id' in this section */
            return {
                ...payload.session,
                user: {
                  ...payload.session.user,
                  id: payload.token.sub,
                  authority: ['admin', 'user']
                },
            }
        }
    },
} satisfies NextAuthConfig;
```

## OAuth Integration

NextAuth supports a wide range of OAuth providers, you can check out this link for more built in providers NextAuth supports. Below is an example of integrating Google as an OAuth provider.

```js
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }),
    ],
}
```

## Accessing Sessions on Client and Server

Authentication often requires session management both on the client and server. Our template provides utilities for handling sessions seamlessly in both environments

### Client Side:

While NextAuth provides the useSession hook, it has known re-render issues. To address this, we includes a custom session hook called useCurrentSession. It provides a same but lesser defects way to manage the session state on the client.

```tsx
import useCurrentSession from '@/utils/hooks/useCurrentSession'

const Component = () => {
    const { session } = useCurrentSession()

    return (
        <div>
            {session ? (
                <>
                    <h1>Welcome, {session.user.name}!</h1>
                    <p>Email: {session.user.email}</p>
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    )
}

export default Component
```

### Server Side:

For server-side operations, you can use the auth() function to securely retrieve session details. This is particularly useful when you are restricting user access to some routes or pre fetching user data before rendering the page

```tsx
import { auth } from '@/auth'

export default async function Page() {
    const session = await auth()

    if (!session) {
        // Redirect or show an error for unauthenticated users
        return <p>You must be logged in to view this page.</p>
    }

    return (
        <div>
            <h1>Welcome, {session.user.name}!</h1>
            <p>Your email: {session.user.email}</p>
        </div>
    )
}
```

## Removing auth

If you choose not to use NextAuth, follow these steps to remove it:

1. **Uninstall NextAuth:**
    ```bash
    npm uninstall next-auth
    ```
2. **Remove next auth related files:**
    - Remove the src/configs/auth.config.ts.
    - Delete dynamic API routes at pages/api/auth/[...nextauth].
    - Reset or delete(if you do not need routing protection) middleware.ts.
3. **Remove all auth() & useCurrentSession() implementations from following components:**
    - app/layout.tsx
    - components/template/HorizontalNav.tsx
    - components/template/MobileNav.tsx
    - components/template/SideNav.tsx
    - components/template/UserProfileDropdown.tsx
    - components/template/StackeSideNav.tsx

By following these steps, you can successfully remove NextAuth from the template and replace it with your preferred authentication method.

## Official Documentation

For further details on using NextAuth, visit [NextAuth.js Documentation](https://authjs.dev/getting-started/installation?framework=Next.js).
