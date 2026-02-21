# Layouts

AgriHype Dashboard provides 6 types of post login layouts & 3 types of auth layouts. All layouts component can be found under directory `src/components/layouts/PostLoginLayout/components` and all the components used within layouts can be found under `src/components/template/`.

## Post Login Layouts

The following are the post login layouts that we have:

- Collapsible side - 'collapsibleSide'
- Stacked side - 'stackedSide'
- Top bar classic - 'topBarClassic'
- Frameless side - 'framelessSide'
- Content overlay - 'contentOverlay'
- Blank - 'blank'

## Configuring Layout

You can configure the initial layout in `src/configs/theme.config.ts` with the string value above.

```ts
export const themeConfig = {
    ...
    layout: {
        type: 'framelessSide',
        ...
    },
}
```

## Layout Configuration Options

Here are the available values and keys for configuring the layout field:

| Property        | Description                                                                                       | Type    | Default           |
| --------------- | ------------------------------------------------------------------------------------------------- | ------- | ----------------- | ------------- | --------------- | --------------- | ---------------- | -------- |
| type            | Type of the application layout                                                                    | 'blank' | 'collapsibleSide' | 'stackedSide' | 'topBarClassic' | 'framelessSide' | 'contentOverlay' | 'modern' |
| sideNavCollapse | Whether to collapse the side navigation (only only applicable when type is 'classic' or 'modern') | boolean | false             |

## Overriding Layouts

In general, all route views will follow the settings of the layout in `theme.config.ts`. However, if there are some cases where you want to show a different layout in a certain route view, you can set the layout value you wish under the route meta to override the current layout as we mentioned in Routing guide.

```ts
export const protectedRoutes = {
    '/your-page-path': {
        key: 'keyForYourPage',
        authority: [ADMIN, USER],
        meta: {
            ...
            layout: 'blank',
        },
    },
}
```

## Auth Layouts

Configuring auth layout is slightly different from the above. Just need to visit `src/app/(auth-pages)/layout.tsx` and replace the wrapper component. For example, switching side to simple:

```ts
import { ReactNode } from 'react'
import Side from '@/components/layouts/AuthLayout/Side'
import Simple from '@/components/layouts/AuthLayout/Simple'
// import Split from '@/components/layouts/AuthLayout/Split'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-auto flex-col h-[100vh]">
            <Simple>
                <Side>
                    {children}
                </Side>
            </Simple>
        </div>
    )
}

export default Layout
```
