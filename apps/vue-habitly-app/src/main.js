import { ScreenOrientation } from '@capacitor/screen-orientation'
// import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'

import App from './App.vue'

import { isNative } from '@/envs'
import { bootstrap as prepareModules } from '@/modules'
import { i18n } from '@/modules/i18n'
import router from '@/modules/router'

import '@/assets/main.css'

(async () => {
  if (isNative) {
    await ScreenOrientation.lock({ orientation: 'portrait' })
  }

  const app = createApp(App)

  await prepareModules()

  // app.use(IonicVue)

  app.use(router)
  app.use(i18n)
  app.mount('#app')
})()
