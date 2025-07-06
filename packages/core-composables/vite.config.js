import { fileURLToPath, URL } from 'url'

import vue from '@tech-labs/core-plugin-wrappers/@vitejs/plugin-vue'
import vitePluginEslint from '@tech-labs/core-plugin-wrappers/vite-plugin-eslint'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginEslint(),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@tech-labs/core-utils',
        '@tech-labs/eslint-config-linter',
      ],
      output: { globals: { vue: 'Vue' } },
    },
    emptyOutDir: false,
  },
  optimizeDeps: {
    include: [
      'vue',
      '@tech-labs/core-utils',
      '@tech-labs/eslint-config-linter',
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
