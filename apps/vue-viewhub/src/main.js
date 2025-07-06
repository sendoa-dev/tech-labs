import { createApp } from 'vue'

import App from './App.vue'
import { i18n } from './modules/i18n'
import { bootstrap as prepareApp } from './modules/index.js'
import router from './modules/router'

import '@/assets/main.css'

(async () => {
  await prepareApp()

  createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
})()
