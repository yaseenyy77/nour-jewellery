import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // شيلنا المسار القديم عشان يشتغل على فيرسيل بدون مشاكل
  base: '/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})