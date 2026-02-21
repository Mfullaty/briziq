# Routing

AgriHype Dashboard routing follows the Next.js App Router conventions, it uses a file-based routing system where each file in the /app directory corresponds to a route in your application. Subfolders represent nested routes, making it easy to structure complex navigation.

For detailed information & concepts about the Next.js App Router, please refer to the documentation

## Route configuration

Although Next.js provides a robust and powerful routing system out of the box, our template introduces an additional layer of routing configuration. This approach allows us to extend and customize the behavior of each page while maintaining flexibility and scalability

The router configuration for the template can be found in src/configs/routes.config/index.ts. There are 3 main groups of routes:

```ts
export const publicRoutes = [
    ...
]

export const protectedRoutes = [
    ...
]

export const authRoutes = [
    ...
]
```

- **publicRoutes:**
  This group includes all routes that are accessible to all users.

- **protectedRoutes:**
  This group contains routes that require authentication to access.

- **authRoutes:**
  This group configuration handles routes related to login, registration, and authentication processes.

## Configuration Structure

Our custom routing configuration introduces a structured way to define and extend the behavior of each route in the application. Here's a breakdown of the configuration structure:

```ts
export const protectedRoutes = {
    '/articles': {
        key: 'articles',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/articles/[slug]': {
        key: 'articles.articleDetails',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
        dynamicRoute: true,
    },
}
```

### Key Components of the Configuration:

- **Route Keys (Matchers):**
  Each key in theroutes object (e.g., '/articles','/articles/[slug]') serves as a route matcher for the current URL. When a user visits a page, the application matches the URL against the route keys in the configuration. Once a match is found, it retrieves the corresponding route data from the configuration object and applies the defined settings.

    For example:
    - '/articles' matches a static route.
    - '/articles/[slug]' matches a dynamic route, where[slug] is a placeholder for replaced with the actual dynamic value from the URL.

- **Configuration Object:**
  Each route key maps to a configuration object containing the following properties:
    - **key:**
      An identifier for the route that pair with navigation config.
    - **authority:**
      An array of roles (e.g., [ADMIN, USER]) that specifies which user roles are allowed to access the route. This implements Role-Based Access Control (RBAC).
    - **meta:**
      Metadata for the route, providing additional customization options:
    - **dynamicRoute:**
      A boolean flag indicating whether the route is dynamic (i.e., contains a parameter placeholder [slug]).

## Authority

AgriHype Dashboard routes support simple role-based access control. You can specify the roles that have access to a route by using the authority field. For example, the following route is only accessible to users with the 'admin' or 'user' roles. If the authority field is left as an empty array, the route will be open to all roles.

```ts
export const protectedRoutes = [
    {
        ...
        authority: ['admin', 'user'],
    },
]
```

Of course, the authority model is flexible and can be changes to meet your projects specific requirements. You can configure it to intercept user access either at the middleware level on the server or directly at the client level for enhanced control.

## Meta

The meta field allows you to pass additional information to the PageContainer or the view component associated with the route.

```ts
export const protectedRoutes = [
    {
        ...
        meta: {
            pageContainerType: 'gutter',
            header: {
                title: 'My tittle',
                description: 'Some description'
                contained: false,
                extraHeader: lazy(() => import('@/components/SomeComponent')),
            },
            footer: false,
            layout: 'blank',
        }
    },
]
```

The layout will be able to access all the meta data specified.

| properties         | Description                                       | Type             | Default           |
| ------------------ | ------------------------------------------------- | ---------------- | ----------------- | ----------------------------------------------------------- | -------------------------------------------------- | --------------- | ---------------------------------------- | --- | --- |
| pageContainerType  | Defines the type of the view container            | 'default'        | 'gutterless'      | 'contained'                                                 | 'default'                                          |
| pageBackgroundType | Define the type of the page background            | 'default'        | 'plain'           | -                                                           |
| header             | Specifies the page header & further configuration | { title?: string | ReactNode         | LazyExoticComponent<() => JSX.Element> description?: string | ReactNode contained?: boolean extraHeader?: string | ReactNode       | LazyExoticComponent<() => JSX.Element> } | -   |
| footer             | Determines whether to display the footer          | boolean          | true              |
| layout             | Overrides the current layout for this page        | 'blank'          | 'collapsibleSide' | 'stackedSide'                                               | 'topBarClassic'                                    | 'framelessSide' | 'contentOverlay'                         | -   | -   |
