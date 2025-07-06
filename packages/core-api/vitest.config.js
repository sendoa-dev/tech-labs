import vitestConfig from '@tech-labs/config-vitest'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ...vitestConfig(),
    },
  }),
)
