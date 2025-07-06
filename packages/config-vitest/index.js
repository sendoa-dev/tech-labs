import { configDefaults } from 'vitest/config'

export default () => ({
  environment: 'jsdom',
  watch: false,
  globals: true,
  coverage: { provider: 'v8' },
  exclude: [...configDefaults.exclude, '**/e2e/*'],
})
