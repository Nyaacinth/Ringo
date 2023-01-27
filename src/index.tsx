import { render } from "solid-js/web"
import { MainApp } from "./MainApp"

import "@unocss/reset/antfu.css"
import "uno.css"

render(() => <MainApp />, document.getElementById("root")!)
