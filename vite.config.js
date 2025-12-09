import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '#components': path.resolve(process.cwd(), 'src/components'),
      '#constants':  path.resolve(process.cwd(), 'src/constants'),
      '#store':      path.resolve(process.cwd(), 'src/store'),
      '#hoc':        path.resolve(process.cwd(), 'src/hoc'),
      '#windows':    path.resolve(process.cwd(), 'src/windows'),
    }
  }
})
