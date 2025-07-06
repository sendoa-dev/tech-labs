import { fileURLToPath, URL } from 'url'

import vue from '@tech-labs/core-plugin-wrappers/@vitejs/plugin-vue'
import vitePluginEslint from '@tech-labs/core-plugin-wrappers/vite-plugin-eslint'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [
    vue(),
    vitePluginEslint(),
    svgLoader({ svgoConfig: { plugins: ['prefixIds'] } }),
  ],
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
