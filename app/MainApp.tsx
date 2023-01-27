import { Button } from "@suid/material"
import { Component, createSignal } from "solid-js"

export const MainApp: Component = () => {
    const [count, setCount] = createSignal(0)

    return (
        <Button variant="contained" onClick={() => setCount((count) => count + 1)}>
            Count: {count()}
        </Button>
    )
}
