# Overall Theme Config
The file src/configs/theme.config.ts contains the default theme settings for the template. These configurations are predefined but can be customized to suit your needs. Below is the default configuration:

If you realize that the theme did not change after setting a new value to the configuration, you could consider to clear the theme key from cookies

## TypeScript
```ts
import { THEME_ENUM } from '@/constants/theme.constant'
import {
    Direction,
    Mode,
    ControlSize,
    LayoutType,
} from '@/@types/theme'

export type ThemeConfig = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    controlSize: ControlSize
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

export const themeConfig: ThemeConfig = {
    themeSchema: '',
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

## JavaScript
```js
import { THEME_ENUM } from '@/constants/theme.constant'

export const themeConfig = {
    themeSchema: '',
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

## Configuration Properties
| Prop                | Description                                                                                                                             | Type                                                                                                               | Default |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------- |
| themeSchema         | Sets the color scheme of the template. you can leave this field empty if you are having dynamic theme in your app                        | string                                                                                                             | ''      |
| direction           | Defines the text direction for the template.                                                                                             | 'ltr' | 'rtl'                                                                                                               | 'ltr'  |
| mode                | Toggles between Light and Dark mode.                                                                                                     | 'light' | 'dark'                                                                                                             | 'light' |
| panelExpand         | Determines whether the side panel is expanded by default.                                                                                | boolean                                                                                                            | false   |
| controlSize         | Sets the initial size of control inputs.                                                                                                 | 'xs' | 'sm' | 'md' | 'lg'                                                                                                                   | 'md'    |
| layout.type         | Defines the overall layout style of the application.                                                                                      | 'blank' | 'collapsibleSide' | 'stackedSide' | 'topBarClassic' | 'framelessSide' | 'contentOverlay'                                             | 'modern' |
| layout.sideNavCollapse | Specifies whether the side navigation is collapsed. This option is only applicable when type is set to 'collapsibleSide' or 'framelessSide'. | boolean                                                                                                            | false   |

## State Persistence
We store the theme configuration in cookies, but it's only saved there when the theme is changed using the useTheme hook. By default, the theme configuration is loaded from theme.config.tsx.

