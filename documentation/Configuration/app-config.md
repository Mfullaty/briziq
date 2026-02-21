# App Config
You can configure various static app settings in src/configs/app.config.ts. Below are the default configurations for both the demo and starter versions.

## Demo Configuration

### TypeScript

```ts
const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/dashboards/ecommerce',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: true
}
```

### JavaScript

```js
const appConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/dashboards/ecommerce',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: true
}
```

## Starter Configuration

### Typescript

```ts
const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: false
}
```

### JavaSCript

```js
const appConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: false
}
```

## Configuration Metadata

| Property                 | Description                                                                                     | Type    | Default (Demo)         | Default (Starter) |
| ------------------------ | ----------------------------------------------------------------------------------------------- | ------- | ---------------------- | ----------------- |
| apiPrefix                | The base path for all API requests.                                                            | string  | '/api'                 | '/api'            |
| authenticatedEntryPath   | The path users are redirected to after successful authentication.                              | string  | '/app/sales/dashboard' | '/home'           |
| unAuthenticatedEntryPath | The path users are redirected to if they are not authenticated.                               | string  | '/sign-in'             | '/sign-in'        |
| locale                   | The default language/locale for the app.                                                       | string  | 'en'                   | 'en'              |
| activeNavTranslation     | Enables or disables the tranlation fucntionality that implmented in navigation.               | boolean | true                   | false             |
