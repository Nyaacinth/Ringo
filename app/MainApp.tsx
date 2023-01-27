import { Component, createSignal } from "solid-js"

export const MainApp: Component = () => {
    const [count, setCount] = createSignal(0)

    return <button onClick={() => setCount((count) => count + 1)}>Count: {count()}</button>
}
