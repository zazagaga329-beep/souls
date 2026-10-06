import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/souls/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        games: 'games.html',
      },
    },
  },
})
