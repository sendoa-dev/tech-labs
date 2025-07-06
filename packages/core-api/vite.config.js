import { fileURLToPath, URL } from 'url'

import vitePluginEslint from '@tech-labs/core-plugin-wrappers/vite-plugin-eslint'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginEslint(),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      formats: ['es'],
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'axios',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
