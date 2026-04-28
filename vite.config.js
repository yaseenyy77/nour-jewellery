import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // ضيفنا السطر ده عشان المسارات تشتغل صح على GitHub Pages
  base: '/nour-jewellery/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})