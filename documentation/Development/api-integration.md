# API Integration

Next.js provides a built-in API routing system, enabling you to define backend functionality directly within your application. This system allows you to handle requests, process data, and communicate with external services seamlessly, all while colocating your API logic with your Next.js project structure.

In this section, we'll explore how APIs work in Next.js, provide examples of creating API routes, and demonstrate how it work with Briziq Dashboard.

## How API Routes Work

- **File-based API Routes:**
  API routes are created inside the /app/api directory. Each file within this directory defines an endpoint. The file name (or folder structure) corresponds to the endpoint's path.

- **Request and Response Objects:**
  API routes handle requests and responses using Node.js-stylereq and res objects. This makes it easy to process incoming data and send responses.

- **Server-side Execution:**
  API routes always run on the server, ensuring secure handling of sensitive operations such as database queries or authentication logic.

For more comprehensive details, refer to the official Next.js documentation on API Routes.

## Creating API Routes

Here's an example of creating a simple API route

### Create the API Route

Create a file named hello.ts in the src/app/api/hello/route.ts directory:

#### TypeScript

```ts
import { NextResponse } from 'next/server'

const mockMethodThatSavesToDatabase = async (data) => {
    // Simulate saving to a database
    console.log('Data saved to database:', data)
}

export async function POST(request: Request) {
    try {
        // Fetch data from an external API
        const externalApiResponse = await fetch(
            'https://jsonplaceholder.typicode.com/posts/1',
        )
        const externalData = await externalApiResponse.json()

        // Save the fetched data to the database
        await mockMethodThatSavesToDatabase(externalData)

        return NextResponse.json({
            message: 'Data saved successfully',
            data: externalData,
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to save data', details: error.message },
            { status: 500 },
        )
    }
}
```

#### JavaScript

```js
import { NextResponse } from 'next/server'

const mockMethodThatSavesToDatabase = async (data) => {
    // Simulate saving to a database
    console.log('Data saved to database:', data)
}

export async function POST(request) {
    try {
        // Fetch data from an external API
        const externalApiResponse = await fetch(
            'https://jsonplaceholder.typicode.com/posts/1',
        )
        const externalData = await externalApiResponse.json()

        // Save the fetched data to the database
        await mockMethodThatSavesToDatabase(externalData)

        return NextResponse.json({
            message: 'Data saved successfully',
            data: externalData,
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to save data', details: error.message },
            { status: 500 },
        )
    }
}
```

## Calling an API Route from the Client Side

To simplify client-side API calls, our template includes a utility ApiService under the services directory. This utility: Accepts an Axios request configuration andautomatically handles responses and errors, returning only the relevant data or error details. Here's how it works:

1. Start by creating a new service file specific to your feature or module. For instance, if you're working on user management, create a file named UserManagementService.ts in the services directory.

2. Inside the service file, declare an asynchronous function to handle the API request. This function should utilize ApiService.fetchData, accepting two generic types: Response and Request, along with the Axios configuration. Here's an example:

### TypeScript

```ts
type MyApiResponse = {
    someResponseData: string
    someResponseData2: boolean
}

type MyApiRequest = {
    someRequestData: string
}

export async function myApi(data) {
    return ApiService.fetchData<MyApiResponse, MyApiRequest>({
        url: '/my-api-url',
        method: 'post',
        data,
    })
}
```

### JavaScript

```js
export async function myApi(data) {
    return ApiService.fetchData({
        url: '/my-api-url',
        method: 'post',
        data,
    })
}
```

#### Forwarding the type to generic from consumer level:

##### TypeScript

```ts
import ApiService from './ApiService'

export async function myApi<TResponse, TRequest>(data) {
    return ApiService.fetchData<TResponse, TRequest>({
        url: '/my-api-url',
        method: 'post',
        data,
    })
}
```

##### JavaScript

```js
import ApiService from './ApiService'

export async function myApi(data) {
    return ApiService.fetchData({
        url: '/my-api-url',
        method: 'post',
        data,
    })
}
```

3. And now you can hook up this API in your component

### TypeScript

```tsx
type MyApiResponse = {
    someResponseData: string
    someResponseData2: boolean
}

type MyApiRequest = {
    someRequestData: string
}

import { myApi } from './MyService.ts'

const MyComponent = props => {

    const fetchData = async () => {
        const reqeustParam = { key: 'value'}
        try {
            const resp = await myApi<MyApiResponse, MyApiRequest>(reqeustParam)
            if (resp.data) {
                ...do something
            }
        } catch (errors) {
            ...handle errors
        }
    }

    // You can
    useEffect(() => {
        fetchData()
    }, [])

    return (
    ...
)
```

### JavaScript

```jsx
import { myApi } from './MyService.ts'

const MyComponent = props => {

    const fetchData = async () => {
        const reqeustParam = { key: 'value'}
        try {
            const resp = await myApi(reqeustParam)
            if (resp.data) {
                ...do something
            }
        } catch (errors) {
            ...handle errors
        }
    }

    // You can
    useEffect(() => {
        fetchData()
    }, [])

    return (
    ...
)
```

Note: You can also use data-fetching libraries like SWR or TanStack Query for a more declarative approach to data fetching. The choice depends on your specific needs.

With ApiService, handling client-side API calls becomes standardized and easier to maintain. Combined with Next.js API routes, you can seamlessly manage server-side logic and interact with your backend.
