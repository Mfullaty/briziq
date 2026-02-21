# Navigation Config
We form our navigation structure as array of objects & render it into UI eventually. You can change or customize the app navigation very easily by accessing src/configs/navigation.config/index.ts

## Menu Item Types

Here is the type for a single menu item

```ts
export type HorizontalMenuMeta = {
    layout: 'default'
} | {
    layout: 'columns'
    showColumnTitle?: boolean
    columns: 1 | 2 | 3 | 4 | 5
} | {
    layout: 'tabs'
    columns: 1 | 2 | 3 | 4 | 5
}

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

## Property Reference

| Property           | Description                                                                                                                     | Type                                                                                                    | Default |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------- |
| key               | An key that match with the route for highlighting purpose                                                                      | string                                                                                                   | -       |
| path              | An URL that this menu item link to                                                                                             | string                                                                                                   | -       |
| isExternalLink    | Whether to open link in new tab upon click                                                                                      | boolean                                                                                                  | -       |
| title             | Rendered text of this menu item                                                                                                 | string                                                                                                   | -       |
| translateKey      | Translate key to translate the rendered text in menu item, fallback to title if empty or invalid                                | string                                                                                                   | -       |
| icon              | Render icon in menu item, string value must tally with object key in navigation-icon.config.tsx                                  | string                                                                                                   | -       |
| type              | To define the type of current menu item                                                                                         | 'title' | 'collapse' | 'item'                                                                           | -       |
| authority         | Display menu items to users who have the roles given, there will be no access block if the this field is undefine or empty array | string[]                                                                                                 | -       |
| subMenu           | Whether have child in this menu item, it will render a menu group under this menu item, if the type is 'title' or 'collapse', this field accept properties within this table | navigationConfig[]                                                                                       | -       |
| meta              | This is an optional configuration field for navigation. It can include additional information that's only needed in specific use cases | { horizontalMenu?: HorizontalMenuMeta description?: { translateKey: string label: string } } | -       |
| meta.horizontalMenu | Further configuration for horizontal menu, e.g layout, columns & etc.                                                          | { layout: 'default' } | { layout: 'columns' showColumnTitle?: boolean columns: 1 | 2 | 3 | 4 | 5 } | { layout: 'tabs' columns: 1 | 2 | 3 | 4 | 5 } | -       |
| meta.description  | Description of the page, description only available when themeConfig.layout.type is 'contentOverlay'                              | navigationConfig[]                                                                                       | -       |

## Example Navigation Config

```ts
const navigationConfig = [
    {
        key: 'uiComponent',
        path: '',
        title: 'Ui Component',
        translateKey: 'nav.uiComponents',
        icon: 'uiComponents',
        type: 'title',
        authority: ['admin', 'user'],
        /** We can define mnu config here, if we are using horizontal menu */
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4
            }
        },
        subMenu: [
            {
                key: 'uiComponent.common',
                path: '',
                title: 'Common',
                translateKey: 'nav.uiComponentsCommon.common',
                icon: 'common',
                type: 'collapse',
                authority: ['admin', 'user'],
                subMenu: [
                    {
                        key: 'uiComponent.common.button',
                        path: '/button',
                        title: 'Button',
                        translateKey: 'nav.uiComponentsCommon.button',
                        icon: '',
                        type: 'item',
                        authority: ['admin', 'user'],
                        subMenu: []
                    },
                    {
                        key: 'uiComponent.common.typography',
                        path: '/typography',
                        title: 'Typography',
                        translateKey: 'nav.uiComponentsCommon.typography',
                        icon: '',
                        type: 'item',
                        authority: ['admin', 'user'],
                        subMenu: []
                    }
                ]
            }
        ]
    }
]
```

## Configuring Navigation Icon

Navigation icon configuration placed on seperate file in src/configs/navigation-icon.config.tsx

In the above example, we use string value uiComponents in the icon field, we must then use this value in navigation-icon.config.ts to define the icon for the callout.

First, import the icon you want from react-icons

```ts
import { FaBeer } from 'react-icons/fa'

const navigationIcon = {}
```

Set the value used in icon field as & the imported icon component as value

```ts
import { FaBeer } from 'react-icons/fa'

const navigationIcon = {
    uiComponents: <FaBeer />
}
```

Now the corresponding menu item will render FaBeer as the menu icon.