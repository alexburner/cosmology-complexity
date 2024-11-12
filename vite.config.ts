import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For github pages
  // -> https://vitejs.dev/guide/static-deploy.html#github-pages
  base: "/cosmology-complexity/",
  build: { outDir: "docs" },
})
