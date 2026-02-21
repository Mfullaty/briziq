# Environment Variables
Environment variables are a secure way to store and manage configuration data or sensitive information, such as API keys, database connection strings, or environment-specific settings. In Next.js, environment variables are defined in .env files and can be accessed during build time or runtime, depending on their prefix.

## Setting Up Environment Variables

The template already comes with a .env file located in the root directory. Feel free to modify these variables according to your project requirements. Here's an example of an environment variables and naming conventions:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
DATABASE_URL=postgres://user:password@localhost:5432/db_name
```

Public Variables: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. These should not include sensitive data.

Private Variables: Variables without the `NEXT_PUBLIC_` prefix are only available on the server side and are never exposed to the client.

## Accessing Environment Variables

1. Server-Side Access:
Access private variables in server-side functions like API routes or Server Components:

```ts
export async function GET() {
    const databaseUrl = process.env.DATABASE_URL;
    return new Response('Database URL:' + databaseUrl);
}
```

2. Client-Side Access:
Access public variables in your React components:

```ts
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

useEffect(() => {
    console.log('API Base URL:', apiBaseUrl);
}, []);
```

