# Create New Page
This guide walks you through the steps to create a new page in the template. By leveraging Next.js file-system routing and the extended routing configuration, you can easily add new pages with tailored settings.

## Create the Page Component
Navigate to the app directory
In the src/app folder, decide where your new page should go. For example, if the page requires authentication, place it in the src/app/(protected-pages) directory. If it doesn't require authentication, use the src/app/(public-pages) directory instead.

### Create a New File
Create a file named after the new route. For example:

- For a static route, create src/app/new-page/page.tsx.
- For a dynamic route, use brackets to define parameters, e.g., src/app/new-page/[id]/page.tsx.

### Add Your Page Code
Define the React component for your page. Example:

```tsx
const Page = () => {
    return (
        <div>
            <h1>Welcome to the New Page</h1>
            <p>This is a custom page.</p>
        </div>
    );
};

export default Page;
```

### Add Routing Configuration
Extend the routing setup, update the src/configs/route.config/routes.config.ts protectedRoutes or publicRoutes configuration to include your new page. For example:

```ts
import { ADMIN, USER } from '@/constants/roles';

export const protectedRoutes = {
    ...protectedRoutes,
    '/new-page': {
        key: 'newPage',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
};
```

In Next.js, creating a new page is as simple as adding a folder and a page.tsx file

## Additional Notes
Instead of applying 'use client' directly to the page file, it is recommended to create a separate client component and import it into the page. This approach allows the page itself to remain server-rendered, optimizing server-side rendering (SSR) and letting only the client-side logic be handled in the client component. For example:

```tsx
// src/app/(protected-pages)/new-page/page.tsx
import ClientComponent from './ClientComponent';

const NewPage = () => {
    return (
        <div>
            <h1>New Page</h1>
            <ClientComponent />
        </div>
    );
};

export default NewPage;
```

```tsx
// src/app/(protected-pages)/new-page/_components/ClientComponent.tsx
'use client';

const ClientComponent = () => {
    return <p>This component runs on the client.</p>;
};

export default ClientComponent;
```

This way, the page can process SSR tasks before rendering client-side components.