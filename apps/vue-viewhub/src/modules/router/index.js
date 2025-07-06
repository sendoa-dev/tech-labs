import { createRouter, createWebHistory } from 'vue-router'

import { bootstrap as prepareGuards } from '@/modules/router/guards'
import routes from '@/modules/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to) {
    if (to.hash) { return { el: to.hash, behavior: 'smooth' } }
  },
  routes,
})

export default router

export const bootstrap = async () => {
  await prepareGuards(router)
}
