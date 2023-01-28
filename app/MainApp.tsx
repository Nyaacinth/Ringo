import { Route, Router, Routes } from "@solidjs/router"
import { Box } from "@suid/material"
import { Component } from "solid-js"
import { PitchCard } from "./pages/Home"

export const MainApp: Component = () => {
    return (
        <Router>
            <Box
                class="flex-1 justify-center items-center"
                sx={{ background: "repeating-linear-gradient(45deg, #66CCFF, #66CCFF 10px, #87D4FF 0, #87D4FF 20px)" }}
                data-tauri-drag-region
            >
                <Routes>
                    <Route path="/" element={<PitchCard />} />
                </Routes>
            </Box>
        </Router>
    )
}
