# State management
In this template, we've integrated Zustand for client side state management. Zustand is a small, fast, and scalable state management solution that allows you to manage state for your client-side components in a simple and efficient way.

We use Zustand to manage some of the core states in the demo, but it's entirely optional for you to continue using it in your projects. If you prefer a different state management library or even the built-in React state, you can easily switch to what best suits your needs.

## Creating a Zustand State
Creating a Zustand store is straightforward. Below is an example of how you can create a global state to manage a simple counter:

### TypeScript
```ts
import create from 'zustand'

type CouterState = {
    count: number
}

type CouterAction = {
    increaseCount: () => void
    decreaseCount: () => void
}

// Define the store
const useCounterStore = create<CouterState & CouterAction>((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}))

export default useCounterStore
```

### JavaScript
```js
import create from 'zustand'

// Define the store
const useCounterStore = create((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}))

export default useCounterStore
```

In this example, we've created a store with a count state and two actions: increaseCount and decreaseCount. These actions update the state by increasing or decreasing the count.

## Using Zustand State in a Component
Once you've created the store, using it in a component is simple. Here's how you can integrate the useCounterStore into a React component:

```tsx
import useCounterStore from './path/to/store'

const Counter = () => {
    const { count, increaseCount, decreaseCount } = useCounterStore()

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={increaseCount}>Increase</button>
            <button onClick={decreaseCount}>Decrease</button>
        </div>
    )
}

export default Counter
```

In this component, we use the useCounterStore hook to access the count state and the two actions. The UI updates automatically whenever the state changes, and the buttons allow the user to interact with the state.

This is just a basic example to get you started. Zustand is flexible and can be used for more complex state management scenarios as your application grows. If you want to explore more advanced usage, we recommend checking out [official Zustand documentation](https://zustand.docs.pmnd.rs/getting-started/introduction).