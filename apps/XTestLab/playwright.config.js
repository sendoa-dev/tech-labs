import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'

const env = process.env.ENV || 'staging'
dotenv.config({ path: `.env.${env}` })

export default defineConfig({
  projects: [
    {
      name: 'certification',
      testDir: './certification/specs',
    },
  ],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['list'], ['junit', { outputFile: 'results.xml' }]],
  timeout: 30000,
})
