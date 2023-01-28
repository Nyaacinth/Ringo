import { Route, Router, Routes } from "@solidjs/router"
import { Component } from "solid-js"
import { Home } from "./pages/Home"

export const MainApp: Component = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}
