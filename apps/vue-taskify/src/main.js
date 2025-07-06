import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { i18n } from './modules/i18n'
import { bootstrap as prepareApp } from './modules/index.js'
import router from './modules/router'

import '@/assets/main.css'

(async () => {
  await prepareApp()

  const app = createApp(App)

  const pinia = createPinia()

  app.use(pinia)
  app.use(router)
  app.use(i18n)
  app.mount('#app')
})()
