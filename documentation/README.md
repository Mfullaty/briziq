# AgriHype Projects Dashboard – Documentation

This folder contains internal documentation for the AgriHype Projects Dashboard. Start here:

## Getting Started

- [Introduction](./Getting-Started/introduction.md)
- [Installation](./Getting-Started/installation.md)
- [Starter](./Getting-Started/starter.md)
- [Tailwind CSS](./Getting-Started/tailwindcss.md)
- [Custom CSS](./Getting-Started/css.md)
- [Updating](./Getting-Started/updating.md)

## Configuration

- [App Config](./Configuration/app-config.md)
- [Layouts](./Configuration/layouts.md)
- [Navigation Config](./Configuration/navigation-config.md)
- [Direction](./Configuration/direction.md)
- [Internationalization](./Configuration/internationalization.md)
- [Dark & Light Modes](./Configuration/dark-light.md)
- [Theming](./Configuration/theming.md)
- [Overall theme Config](./Configuration/overall-theme-config.md)

## Development

- [Folder Structure](./Development/folder-structure.md)
- [Environment Variables](./Development/environment-variables.md)
- [Authentication](./Development/authentication.md)
- [API Integration](./Development/api-integration.md)
- [State Management](./Development/state-management.md)
- [Development Server](./Development/development-server.md)
- [Create New Page](./Development/create-new-page.md)
- [Routing](./Development/routing.md)
- [Role Based Access Control](./Development/role-based-access-control.md)

## Deployment

- [Deployment](./Deployment/build-production.md)

## Sources

- [Sources & Credits](./SourcesCredits/sources-and-credits.md)

---

## 1. Overview

AgriHype Projects Dashboard is a Next.js + TypeScript admin/dashboard template built on the App Router. It provides:

- **Config-driven layout and navigation** (side/top layouts, collapsible nav, etc.).
- **Authentication** via `next-auth` (GitHub, Google, and credentials).
- **Theming** (light/dark, layout type, direction) persisted in cookies and applied via CSS variables.
- **Service layer** for HTTP calls based on Axios and a `/api` backend.
- **Internationalization** with `next-intl` and JSON message bundles.

This document describes how the app is wired together so you can confidently extend it.

---

## 2. Tech Stack

- **Framework**: Next.js (App Router) with React and TypeScript
- **Styling**: Tailwind CSS 4 + custom CSS (`src/assets/styles/app.css`)
- **Auth**: `next-auth` with OAuth (GitHub, Google) and credentials
- **HTTP/Data**: Axios, thin service layer in `src/services`
- **i18n**: `next-intl`
- **State & utilities**: custom hooks and utilities in `src/utils` (e.g. theme hook, route matching)

Key scripts (`package.json`):

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run production build
- `npm run lint` – run ESLint
- `npm run prettier` / `prettier:fix` – check/fix formatting under `src/`

---

## 3. Project Structure

Relevant top-level items:

- `src/app` – App Router entrypoints (layouts, pages, API routes)
- `src/components` – UI, layouts, auth flows, template components
- `src/configs` – app, auth, theme, navigation, routes, charts
- `src/constants` – shared constants (theme, routes, navigation, etc.)
- `src/server/actions` – server actions (auth, locale, navigation, theme, user)
- `src/services` – Axios base + domain-specific services
- `src/i18n` – `next-intl` configuration
- `src/utils` – helpers (theme application, route matching, hooks, etc.)
- `public` – static assets (e.g. auth side background image)

### 3.1 `src/app` structure

- `src/app/layout.tsx` – **root layout**; wires auth, theme, navigation providers.
- `src/app/page.tsx` – Home page (`/`).
- `src/app/(auth-pages)` – Auth-related pages:
    - `layout.tsx` – wraps auth pages with the auth layout.
    - `sign-in/page.tsx` – sign-in UI.
    - `sign-up/page.tsx` – sign-up UI.
    - `forgot-password/page.tsx` – forgot password UI.
    - `reset-password/page.tsx` – reset password UI.
- `src/app/(protected-pages)` – Pages requiring authentication:
    - `layout.tsx` – wraps all protected pages in post-login layout.
    - `loading.tsx` – loading skeleton for protected routes.
    - `dashboard/page.tsx` – example protected dashboard page (`/dashboard`).
- `src/app/(public-pages)` – placeholder for additional public pages (currently empty).
- `src/app/api` – API routes (e.g. `api/auth/...`).

---

## 4. Root Layout and Global Providers

**File**: `src/app/layout.tsx`

Root layout runs on the server and provides data to client providers:

1. **Authentication session**
    - Calls `auth()` from `src/auth.ts` (NextAuth instance) to get the current session.

2. **Navigation tree**
    - Calls `getNavigation()` from `src/server/actions/navigation/getNavigation.ts`.
    - Returns the array defined in `src/configs/navigation.config`.

3. **Theme**
    - Calls `getTheme()` from `src/server/actions/theme.ts`.
    - Reads the `theme` cookie and falls back to `themeConfig` from `src/configs/theme.config.ts`.

4. **Providers hierarchy**

The returned layout wraps children like this:

- `<AuthProvider session={session}>` (client)
    - `<html className={theme.mode === 'dark' ? 'dark' : 'light'} dir={theme.direction}>`
        - `<body>`
            - `<ThemeProvider theme={theme}>`
                - `<NavigationProvider navigationTree={navigationTree}>`
                    - `{children}` (all app routes)

This ensures every page has access to:

- Auth session via `AuthProvider` / `SessionContext`.
- Theme state and configuration via `ThemeProvider`.
- Navigation tree via `NavigationProvider`.

---

## 5. Routing, Metadata, and Layouts

Routing is handled by the Next.js App Router (filesystem-based) and enriched by config files.

### 5.1 Route configuration

**File**: `src/configs/routes.config/routes.config.ts`

Defines which paths are **protected** vs **public**, and optional metadata:

- `protectedRoutes` example:
    - `/dashboard` – key `dashboard`; metadata includes page background and container type.
- `publicRoutes` example:
    - `/` – key `home` with similar metadata.
- `authRoutes` (imported from `authRoute.ts`):
    - `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`, `/otp-verification`.

This config is the single source of truth for route-level metadata and is used by:

- `middleware.ts` – to enforce access control.
- `utils/queryRoute.ts` – to attach metadata (layout, background, container) at runtime.

### 5.2 Route metadata lookup

**File**: `src/utils/queryRoute.ts`

- Combines `publicRoutes` and `protectedRoutes` into `routes`.
- Provides `matchRoute(path)` which:
    - Normalizes trailing slashes.
    - Checks for an exact path match.
    - Supports matching “dynamic” route patterns based on path segments & a `dynamicRoute` flag.
- Returns a `Route` object with `meta` you define in the config or `null` if not found.

### 5.3 Post-login layout and page container

**File**: `src/components/layouts/PostLoginLayout/PostLoginLayout.tsx`

This client-side layout is used for `(protected-pages)`:

- Reads the **current layout type** from the theme: `const layoutType = useTheme((state) => state.layout.type)`.
- Gets the current pathname via `usePathname()`.
- Looks up the route config: `const route = queryRoute(pathname)`.
- Chooses a concrete layout component:
    - `CollapsibleSide`, `StackedSide`, `TopBarClassic`, `FrameLessSide`, `ContentOverlay`, or `Blank` based on:
        - `route?.meta?.layout` (route override) or
        - global theme layout type.
- Wraps children in `<PageContainer {...route?.meta}>{children}</PageContainer>` to apply background and container settings.

Result: each protected page can inherit global layout or override it via route metadata.

### 5.4 Auth layouts

**Files**:

- `src/app/(auth-pages)/layout.tsx` – wraps auth pages in a `Side` layout.
- `src/components/layouts/AuthLayout/AuthLayout.tsx` – generic auth layout component.
- `src/components/layouts/AuthLayout/Side.tsx` – concrete side layout implementation.

`AuthLayout` uses lazy-loaded variants:

- `Simple`, `Split`, `Side` layouts (all under `AuthLayout/`).
- `currentLayoutType` is currently `'side'`.

`Side` layout:

- Creates a 2-column layout.
- Left column: centers the auth form (children) with a max width.
- Right column (desktop only): shows a decorative background image (`/img/others/auth-side-bg.png`).

---

## 6. Authentication Flow

### 6.1 NextAuth configuration

**File**: `src/configs/auth.config.ts`

Configured providers:

- **GitHub** – `Github({ clientId, clientSecret })` from environment variables:
    - `GITHUB_AUTH_CLIENT_ID`
    - `GITHUB_AUTH_CLIENT_SECRET`
- **Google** – `Google({ clientId, clientSecret })` from environment variables:
    - `GOOGLE_AUTH_CLIENT_ID`
    - `GOOGLE_AUTH_CLIENT_SECRET`
- **Credentials** – `Credentials({ authorize })`:
    - Calls `validateCredential(credentials)` from `src/server/actions/user/validateCredential.ts`.
    - Returns a user object if valid, `null` otherwise.

Session callback:

- `callbacks.session(payload)` extends the default session:
    - Adds `id` and `authority: ['admin', 'user']` to `session.user`.

### 6.2 NextAuth instance and pages

**File**: `src/auth.ts`

Creates a central NextAuth instance:

- `export const { handlers, signIn, signOut, auth } = NextAuth({ pages, ...authConfig })`.
- `pages` override:
    - `signIn: appConfig.authenticatedEntryPath` (currently `/dashboard`).
    - `error: appConfig.authenticatedEntryPath`.

`auth` is used on the server (in `RootLayout` and middleware) to read the session.

### 6.3 Middleware: route protection & redirects

**File**: `src/middleware.ts`

Wraps a middleware handler with `auth` from NextAuth:

- Derives lists of:
    - `publicRoutes` – from `configs/routes.config`.
    - `authRoutes` – sign-in, sign-up, etc.
- Computes helpers:
    - `apiAuthPrefix = "/api/auth"` based on `appConfig.apiPrefix`.

Behavior:

- Skips auth checks for any route under `/api/auth` and for public routes.
- For **auth routes** (e.g. `/sign-in`):
    - If already signed in, redirect to `appConfig.authenticatedEntryPath` (e.g. `/dashboard`).
- For **non-public routes**:
    - If **not signed in**, redirect to `appConfig.unAuthenticatedEntryPath` (e.g. `/sign-in`) and attach the original path as `redirectUrl` query param using `REDIRECT_URL_KEY` from `src/constants/app.constant.ts`.
- Matcher is configured so middleware runs on all non-static routes and `/api` routes.

This ensures:

- Protected pages are only accessible when authenticated.
- Unauthorized users are sent to the sign-in page and then redirected back.

### 6.4 AuthProvider and session context

**Files**:

- `src/components/auth/AuthProvider/AuthProvider.tsx`
- `src/components/auth/AuthProvider/SessionContext.tsx`

`AuthProvider` is a client component used in the root layout:

- Wraps children with:
    - `NextAuthSessionProvider` from `next-auth/react` (with `refetchOnWindowFocus={false}`).
    - Custom `SessionContext.Provider` with the current `session`.

`SessionContext`:

- Provides a basic session shape (`user` plus `expires`), defaulting to `{ expires: '' }` when empty.

You can build hooks (e.g. `useSessionContext`) that rely on this to avoid repeated `useSession` re-renders.

### 6.5 Server actions for auth

**Folder**: `src/server/actions/auth`

Contains server actions such as:

- `handleSignIn`, `handleSignOut`, `handleSignUp`, `handleOauthSignIn`, `getServerSession`, etc. (see files in that folder).

These server actions can be called from components or forms to connect UI with the NextAuth backend.

---

## 7. Theming and Layout System

### 7.1 Theme configuration and constants

**Files**:

- `src/configs/theme.config.ts` – base theme configuration of type `Theme`.
- `src/constants/theme.constant.ts` – constants for directions, modes, layout types, and layout dimensions.
- `src/configs/preset-theme-schema.config.ts` – color palettes for preset themes.

`themeConfig` example values:

- `mode`: light/dark.
- `direction`: LTR/RTL.
- `layout.type`: one of `collapsibleSide`, `stackedSide`, `topBarClassic`, `framelessSide`, `contentOverlay`, `blank`.

### 7.2 Theme persistence via cookies

**File**: `src/server/actions/theme.ts`

- `getTheme()`:
    - Reads `COOKIES_KEY.THEME` from cookies.
    - If present, parses JSON `{ state: Theme }` and returns `state`.
    - Otherwise returns `themeConfig` default.
- `setTheme(theme: string)`:
    - Writes the raw theme string to the same cookie key.

### 7.3 ThemeProvider and CSS variables

**File**: `src/components/template/Theme/ThemeProvider.tsx`

Client-side theme provider:

- Keeps theme in local state: `const [themeState, setThemeState] = useState(theme)`.
- Exposes an async `setTheme` function via context that:
    - Updates React state.
    - Calls `setThemeCookies(JSON.stringify({ state: theme }))` server action.
- Wraps children in:
    - `ThemeContext.Provider` – for reading/updating the theme in components.
    - `ConfigProvider` – passes theme values plus `locale` (from props or `appConfig.locale`).
- Injects a `<script>` tag with `dangerouslySetInnerHTML` that runs on page load:
    - Calls `applyTheme(themeName, mode, presetThemeSchemaConfig)`.

`applyTheme` (in `src/utils/applyThemeSchema.ts`):

- Maps the selected theme and mode to CSS variables:
    - `--primary`, `--primary-deep`, `--primary-mild`, `--primary-subtle`, `--neutral`.
- Writes them to `document.documentElement.style`.

Tailwind tokens reference these CSS variables via the config in `tailwind.config.ts`.

### 7.4 Layout choice per route

As described in **5.3**, `PostLoginLayout` chooses the actual layout component based on:

- Global theme layout type from `useTheme`, and
- Optional per-route `meta.layout` override from route config.

This makes it easy to:

- Set a default layout theme-wide.
- Override for specific pages (e.g. full-bleed stats dashboard vs compact content page).

---

## 8. Navigation System

### 8.1 Navigation config

**File**: `src/configs/navigation.config/index.ts`

- Defines an array of `NavigationTree` items.
- Each item has:
    - `key` – unique identifier.
    - `path` – target route.
    - `title` – label in the UI.
    - `translateKey` – i18n key for the label.
    - `icon` – string identifier for the icon.
    - `type` – one of:
        - `NAV_ITEM_TYPE_ITEM` (simple item)
        - `NAV_ITEM_TYPE_COLLAPSE` (expandable group)
        - `NAV_ITEM_TYPE_TITLE` (section heading)
    - `authority` – list of roles allowed (used for role-based navigation if implemented).
    - `subMenu` – nested items.

The shipped config includes example entries (`singleMenuItem`, `collapseMenu`, `groupMenu`), which you can replace with real app navigation.

### 8.2 NavigationProvider

**File**: `src/components/template/Navigation/NavigationProvider.tsx`

- Client component that:
    - Accepts `navigationTree: NavigationTree[]` from the server.
    - Provides it via `NavigationContext`.
- Any navigation UI component can consume this context to render the menu.

### 8.3 Navigation icons

**File**: `src/configs/navigation-icon.config.tsx`

- Maps icon keys (e.g. `home`, `singleMenu`, `collapseMenu`, `groupMenu`) to React icon components from `react-icons/pi`.

You can extend this mapping to support additional icons referenced from `navigation.config`.

---

## 9. HTTP / Data Layer and APIs

### 9.1 Axios base instance

**File**: `src/services/axios/AxiosBase.ts`

- Creates an Axios instance with:
    - `baseURL: appConfig.apiPrefix` (default `"/api"`).
    - `withCredentials: true` – send cookies.
    - `timeout: 60000`.
- Request interceptor:
    - Delegates to `AxiosRequestIntrceptorConfigCallback(config)` – placeholder where you can inject headers, tokens, etc.
- Response interceptor:
    - Delegates errors to `AxiosResponseIntrceptorErrorCallback(error)`.
    - Currently logs errors via `console.error('error', error)`.

### 9.2 Generic ApiService

**File**: `src/services/ApiService.ts`

- Exposes `fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(param)`.
- Wraps `AxiosBase(param)` and returns a promise resolving to `response.data` or rejecting with `AxiosError`.

This is the main low-level HTTP primitive used by other services.

### 9.3 Domain services

**AuthService** – `src/services/AuthService.ts`:

- `apiSignUp(data)` – POST `/auth/sign-up`.
- `apiForgotPassword(data)` – POST `/auth/forgot-password`.
- `apiResetPassword(data)` – POST `/auth/reset-password`.

**CommonService** – `src/services/CommonService.ts`:

- `apiGetNotificationCount()` – GET `/notifications/count`.
- `apiGetNotificationList()` – GET `/notifications`.
- `apiGetSearchResult(params)` – GET `/search`.

You can mirror these endpoints on the backend using Next.js route handlers under `src/app/api` or an external API.

### 9.4 API routes

**Folder**: `src/app/api`

Each subfolder corresponds to an API route. For example:

- `src/app/api/auth` – auth-related API endpoints (sign-in, sign-up, OAuth callbacks, etc.).

Since `AxiosBase` uses `/api` as base URL, services call into these routes by path (e.g. `/auth/sign-up`).

---

## 10. Internationalization (i18n)

### 10.1 Next.js integration

**File**: `next.config.mjs`

- Wraps the Next.js config with `createNextIntlPlugin()`:
    - `export default withNextIntl(nextConfig)`.

This configures `next-intl` for use in the App Router.

### 10.2 Request-based locale resolution

**File**: `src/i18n/request.ts`

- Uses `getRequestConfig` from `next-intl/server`.
- Calls `getLocale()` from `src/server/actions/locale.ts` to determine the current locale.
- Dynamically imports the corresponding translation messages: - `messages: (await import(
  `../../messages/${locale}.json`
)).default`

To add a new locale:

1. Add a JSON file to `messages/{locale}.json`.
2. Ensure `getLocale()` can return that locale code.
3. Use translation keys (e.g. `nav.home`) in your components.

### 10.3 Default locale

**File**: `src/configs/app.config.ts`

- `locale: 'en'` is the default.
- `ThemeProvider` passes this locale into `ConfigProvider` so downstream components can use it.

---

## 11. Running and Configuring the App

### 11.1 Environment variables

Set the following variables (e.g. in `.env`):

- `GITHUB_AUTH_CLIENT_ID`
- `GITHUB_AUTH_CLIENT_SECRET`
- `GOOGLE_AUTH_CLIENT_ID`
- `GOOGLE_AUTH_CLIENT_SECRET`

Configure any additional secrets used by your API routes.

### 11.2 Local development

1. Install dependencies:
    - `npm install`
2. Run the dev server:
    - `npm run dev`
3. Open the app in the browser (typically http://localhost:3000).

### 11.3 Production build

- Build: `npm run build`
- Start: `npm run start`

---

## 12. Extending the Dashboard

### 12.1 Add a new protected page

1. **Create the page file** under `(protected-pages)`:
    - `src/app/(protected-pages)/reports/page.tsx` → becomes `/reports`.
2. **Register the route** in `src/configs/routes.config/routes.config.ts`:
    - Add an entry to `protectedRoutes`:
        - Key `/reports` with appropriate `meta` (background, container, optional `layout`).
3. **Add navigation item** in `src/configs/navigation.config/index.ts`:
    - Add a new `NavigationTree` item with `path: '/reports'`.

The middleware will automatically treat `/reports` as protected because it’s not in `publicRoutes` and not under `/api/auth`.

### 12.2 Add a new public page

1. Create a page under `(public-pages)` or directly under `src/app` (e.g. `/about`).
2. Add an entry to `publicRoutes` with path `/about` and metadata.
3. Optionally add a navigation item.

The middleware will allow anonymous access to `/about` because it is listed in `publicRoutes`.

### 12.3 Customize authentication pages

- Modify the following files to customize auth UI:
    - `src/app/(auth-pages)/sign-in/page.tsx`
    - `src/app/(auth-pages)/sign-up/page.tsx`
    - `src/app/(auth-pages)/forgot-password/page.tsx`
    - `src/app/(auth-pages)/reset-password/page.tsx`
- Adjust layout by editing `AuthLayout` or switching `currentLayoutType` between `simple`, `split`, and `side`.

### 12.4 Customize theme & layout

- Update `src/configs/theme.config.ts` to change default mode, direction, or layout type.
- Edit `src/configs/preset-theme-schema.config.ts` to define new color presets or tweak existing ones.
- Change which layout components are used post-login by editing `PostLoginLayout` or adding new layout variants.

### 12.5 Add new API endpoints

1. Create a route handler under `src/app/api` (e.g. `src/app/api/reports/route.ts`).
2. In a service file (e.g. `src/services/ReportsService.ts`), use `ApiService.fetchDataWithAxios` with URL `/reports`.
3. Call the service from your components or server actions.

Because `AxiosBase` uses `/api` as `baseURL`, the service paths are concise and relative to your Next.js API routes.

---

## 13. Where to Look Next

- For **UI components**: explore `src/components/ui` and `src/components/template`.
- For **charts and maps**: see config and components using `chart.config.ts`, `react-apexcharts`, `react-simple-maps`, and related libs.
- For **role-based access**: check commented guidance in `middleware.ts` and extend route config with `authority` settings.

This document should give you an end-to-end understanding of how the AgriHype Projects Dashboard works so you can safely adapt it to your product’s needs.
