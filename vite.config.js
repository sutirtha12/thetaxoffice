import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Guarantee a single React instance — avoids "Invalid hook call" when
    // libraries (framer-motion, gsap, three) resolve their own copy.
    dedupe: ['react', 'react-dom'],
  },
})
