export const bootstrap = async (router) => {
  handleRequiresAuth(router)
}

const handleRequiresAuth = (router) => {
  router.beforeEach(async (to, from, next) => {
    // const requiresAuth = typeof to.meta.requiresAuth === 'function'
    //   ? to.meta.requiresAuth(to)
    //   : to.meta.requiresAuth

    // const { getAccessToken } = useSession()

    // const accessToken = await getAccessToken()

    // requiresAuth && !accessToken
    //   ? next({ name: 'auth' })
    //   : next()
    next()
  })
}
