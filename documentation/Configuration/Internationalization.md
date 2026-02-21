# Internationalization
Our template uses next-intl to handle internationalization (i18n). By default, the starter does not include i18n setup, as not every project requires this feature. However, we offer two distinct setups to cater to both scenarios: Without i18n Routing (default) and With i18n Routing.

We integrates i18n into the navigation module by default. If you need to having i18n in your app, you might need to toggle the activeNavTranslation field in src/configs/app.config.ts to true.

```ts
// src/configs/app.config.ts
export const appConfig: AppConfig = {
    ...
    activeNavTranslation: true
}
```

## Without i18n Routing
This setup is designed for simplicity, allowing you to manage translations without involving URL structures, which we implemented in our demo.

### Step 1: Add Translation Files
Add your translation files to the messages folder in the root directory:

```text
messages/
├── en.json
├── es.json
└── fr.json
```
This is a simplest example to add your translation key to a JSON files

```json
// messages/en.json
{
    "title": "Home",
}
// messages/es.json
{
    "title": "Inicio",
}
```

### Step 2: Wrap Application with LocaleProvider
Wrap the application with LocaleProvider in src/app/layout.tsx and inject necessary props

#### Typescript
```ts
// src/app/layout.tsx
...
import LocaleProvider from "@/components/template/LocaleProvider";
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    const locale = await getLocale();

    const messages = await getMessages();

    ...                          

    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning>
                <LocaleProvider locale={locale} messages={messages}>
                    <ThemeProvider locale={locale} theme={theme}>
                        ...other components
                        {children}
                    </ThemeProvider>
                </LocaleProvider>  
            </body>
        </html>
    );
}
```

#### JavaScript
```js
// src/app/layout.jsx
...
import LocaleProvider from "@/components/template/LocaleProvider";
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
    children,
}) {

    const locale = await getLocale();

    const messages = await getMessages();

    ...                          

    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning>
                <LocaleProvider locale={locale} messages={messages}>
                    <ThemeProvider locale={locale} theme={theme}>
                        ...other components
                        {children}
                    </ThemeProvider>
                </LocaleProvider>  
            </body>
        </html>
    );
}
```

### Step 3: Use Translations
Now you can use translations in your page components or anywhere else with useTranslation hook

```ts
import {useTranslations} from 'next-intl';
 
export default function HomePage() {
    const t = useTranslations();
    return <h1>{t('title')}</h1>;
}
```

## With i18n Routing
Next Intl provide i18n Routing setup, it use unique pathnames for every language that your app supports, this setup can be useful if you need a Prefix-based routing (e.g. /en/about) or Domain-based routing (e.g. en.example.com)

Setting up i18n routing in a Next.js app requires more effort compared with the above one. This setup involves changes to the project structure and additional configurations.

If you're considering implementing i18n routing, refer to the official [next-intl documentation](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) for a comprehensive guide.

### Changing Language
If you need to switch languages dynamically(Without i18n Routing), you can use the i18n object provided by the useTranslation hook to change the current language.

#### TypeScript
```ts
'use client'
                
import { setLocale } from '@/server/actions/locale'

const Component = () => {

    const handleUpdateLocale = async (locale: string) => {
        await setLocale(locale)
    }

    return (
        <button onClick={() => handleUpdateLocale('fr')}>Change language</button>
    )
}

export default Component
```

#### JavaScript
```js
'use client'
                
import { setLocale } from '@/server/actions/locale'

const Component = () => {

    const handleUpdateLocale = async (locale) => {
        await setLocale(locale)
    }

    return (
        <button onClick={() => handleUpdateLocale('fr')}>Change language</button>
    )
}

export default Component
```

### Setting the Default Language
To set the default language, you might need to visit src/configs/app.config.ts and change the locale field value

```ts
export const appConfig: AppConfig = {
    ...
    locale: 'fr'
}
```

### Adding New Locale
To support a new language in your app, create a new JSON file for the locale inside the messages folder. For example, to add French translations, create a file named messages/fr.json:

```json
// messages/fr.json
{
    "HomePage": {
        "title": "Bonjour le monde!",
        "about": "Aller à la page à propos"
    }
}
```

Register the new locale value in src/i18n/dateLocales.ts

#### TypeScript
```ts
export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    ...
    fr: () => import('dayjs/locale/fr'),
}
```

#### JavaScript
```js
export const dateLocales = {
    ...
    fr: () => import('dayjs/locale/fr'),
}
```

For i18n Routing, you might need to include the new locale value to routing configuration & middleware