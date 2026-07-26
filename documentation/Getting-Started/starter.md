# Starter

As mentioned in the Installation section, we've provided a starter version with the essential core components and basic functionality setup. We highly recommend that developers use this version as the foundation for building their apps.

When you open the starter pack in your local environment, you'll be directed to the login page. You can sign in using the credentials user email: admin@briziq.com | password: admin@briziq.com

## Default Configurations

Below are some of the default configurations for the starter version. You can modify these settings to suit your needs.

### APP CONFIG

#### TypeScript

```ts
const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: false,
}
```

#### JavaScript

```js
const appConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: false,
}
```

### THEME CONFIG

#### TypeScript

```ts
export const themeConfig: ThemeConfig = {
    schema: 'default',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
        sideNavCollapse: false,
    },
}
```

#### JavaScript

```js
export const themeConfig = {
    schema: 'default',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
        sideNavCollapse: false,
    },
}
```

### ROUTES CONFIG

#### TypeScript

```ts
const publicRoutes = [
    '/home': {
        key: 'home',
        authority: [],
    }
]

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
        dynamicRoute: true
    },
}
```

### NAV CONFIG

```ts
const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
]
```
