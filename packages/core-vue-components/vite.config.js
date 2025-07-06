import { fileURLToPath, URL } from 'url'

import vue from '@tech-labs/core-plugin-wrappers/@vitejs/plugin-vue'
import vitePluginEslint from '@tech-labs/core-plugin-wrappers/vite-plugin-eslint'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginEslint(),
    svgLoader({
      svgoConfig: {
        plugins: [
          { name: 'prefixIds', active: true },
          { name: 'mergePaths', active: true },
          { name: 'removeDimensions', active: true },
          { name: 'convertColors', params: { currentColor: true } },
          { name: 'removeAttrs', params: { attrs: ['stroke-width'] } },
        ],
      },
    }),
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
        '@tech-labs/core-composables',
        '@tech-labs/eslint-config-linter',
        '@popperjs/core',
        'floating-vue',
        'v-calendar',
        'vue-content-loader',
        'vue-multiselect',
      ],
      output: { globals: { vue: 'Vue' } },
    },
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: [
      'vue',
      '@tech-labs/core-utils',
      '@tech-labs/core-composables',
      '@tech-labs/eslint-config-linter',
      '@popperjs/core',
      'floating-vue',
      'v-calendar',
      'vue-content-loader',
      'vue-multiselect',
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
