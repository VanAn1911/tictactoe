import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/c(onfig/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
