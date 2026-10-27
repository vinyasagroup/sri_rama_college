import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const app = (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

createRoot(document.getElementById("root")!).render(
  import.meta.env.DEV ? app : <StrictMode>{app}</StrictMode>
)
