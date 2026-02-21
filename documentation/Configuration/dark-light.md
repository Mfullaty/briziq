# Dark/Light Mode
To initialize dark or light mode to the app, simply set mode field as'light' or 'dark' in src/configs/theme.config.ts. For example:

```ts
export const themeConfig = {
    ...
    mode: 'dark'
}
```

## Hook

You can access or update the mode in a component via our prepared hook.

### TypeScript

```ts
'use client'

import useTheme from '@/utils/hooks/useTheme'
import Switcher from '@/components/ui/Switcher'

const ModeSwitcher = () => {

    const mode = useTheme((state) => state.mode)
    const setMode = useTheme((state) => state.setMode)

    const onSwitchChange = (checked: boolean) => {
        setMode(checked ? 'dark' : 'light')
    }
    
    return (
        <div>
            <Switcher
                defaultChecked={mode === 'dark'}
                onChange={onSwitchChange}
            />
        </div>
    )
}

export default ModeSwitcher
```

### JavaScript

```js
'use client'

import useTheme from '@/utils/hooks/useTheme'
import Switcher from '@/components/ui/Switcher'

const ModeSwitcher = () => {

    const mode = useTheme((state) => state.mode)
    const setMode = useTheme((state) => state.setMode)

    const onSwitchChange = (checked) => {
        setMode(checked ? 'dark' : 'light')
    }
    
    return (
        <div>
            <Switcher
                defaultChecked={mode === 'dark'}
                onChange={onSwitchChange}
            />
        </div>
    )
}

export default ModeSwitcher
