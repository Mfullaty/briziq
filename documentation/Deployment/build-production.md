# Build production
This section covers the steps to deploy your app to a live environment. Whether you're using Vercel or a custom hosting solution, follow these guidelines to ensure a smooth deployment process.

For detailed instructions on platform-specific deployments, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/app/getting-started/deploying).

## Preparing for Deployment
Before deploying, ensure that your app is production-ready:

- **Environment Variables:**
  Verify that all required variables (e.g., API keys, database URLs) are correctly set in your environment configuration.

- **Build Optimizations**
  Run the following command to create an optimized production build:

```bash
npm run build
```

- **Testing**
  Test your app locally using the production build to identify potential issues:

```bash
npm run start
```

## Deploying to Vercel
Vercel is a popular platform for deploying Next.js apps.

1. **Connect to Vercel:** Sign in to Vercel and import your Git repository.
2. **Configure Build Settings:** Ensure the framework is set to Next.js, and the build command is `npm run build`.
3. **Environment Variables:** Add environment variables directly in the Vercel dashboard.
4. **Deploy:** Click Deploy, and Vercel will automatically handle the rest.

## Custom Hosting
If you're deploying to a custom server or VPS, make sure Node.js is installed on your server.

**Build the App:** Run the production build

```bash
npm run build
```

**Run the App**

```bash
npm run start
```

You can use a process manager like pm2 or Docker to manage your app