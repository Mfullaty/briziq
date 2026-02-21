# CSS
While we primarily use Tailwind CSS, we also have additional custom styles written in standard CSS, located in the src/assets/styles/* directory. Because Tailwind depends on certain CSS processing features, we're using PostCSS as our preprocessor.

Here's an overview of our styles folder structure:

```text
├── styles                     
|   ├── components               # styles for base UI components
|   ├── others                   # styles for animations and others
|   ├── tailwind                 # Tailwind entry & base styles
|   ├── template                 # styles for template components
|   ├── vendors                  # styles for third-party libraries
|   └── app.css                # main entry CSS
```

Each folder inside the styles directory contains an index.css file that imports all other CSS files within the same folder. Eventually, all these index.css files are imported into the main entry CSS.

## Custom CSS
If Tailwind doesn't cover all your styling needs, you can add custom CSS in this folder. We recommend using Tailwind's functions and directives when adding custom styles, such as @apply, @layer, and theme().

