import UnoCSS from "unocss/vite"
import Checker from "vite-plugin-checker"
import Solid from "vite-plugin-solid"

import { defineConfig } from "vite"

export default defineConfig({
    server: {
        port: 1420,
        strictPort: true
    },
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        target: ["es2021", "chrome105", "safari13"]
    },
    plugins: [
        Solid(),
        UnoCSS(),
        Checker({
            typescript: { tsconfigPath: "tsconfig.json" }
        })
    ]
})
