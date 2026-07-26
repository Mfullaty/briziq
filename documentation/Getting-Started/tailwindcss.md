# TailwindCSS

Tailwind CSS is a utility-first CSS framework that provides predefined classes for building and designing UI directly within JSX. Briziq Dashboard utilizes Tailwind as its core CSS framework, with most UI elements built entirely using its features. You can easily update the theme and base styles by modifying the tailwind.config.cjs file located in the root directory.

## Tooling

If you use VS Code as your IDE, we recommend installing the Tailwind CSS IntelliSense plugin. This plugin provides autocomplete, syntax highlighting, and linting based on your Tailwind configuration, which can significantly speed up your development process.

## Note

Some of our UI components use semantic classes with the Tailwind @apply directive. In certain cases, applying Tailwind classes directly to these components may not work as expected. You might need to use the !important modifier to override the default high specificity selectors.

To make any utility class important, simply add an ! character at the beginning, e.g.:

```tsx
<Dropdown className="bg-red-500!" />
```

For more information on utility classes and Tailwind configuration, visit the [official Tailwind CSS documentation](https://tailwindcss.com/docs/utility-first) for a comprehensive guide.
