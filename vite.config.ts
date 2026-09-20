import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For github pages
  // -> https://vitejs.dev/guide/static-deploy.html#github-pages
  base: "/cosmology-complexity/",
  build: { outDir: "docs" },
})
