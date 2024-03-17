import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@/shared': resolve('src/shared')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets',
    resolve: {
      alias: {
        '@/shared': resolve('src/shared'),
        '@/components': resolve('src/renderer/src/components'),
        '@/lib': resolve('src/renderer/src/lib')
      }
    },
    plugins: [react()]
  }
})
