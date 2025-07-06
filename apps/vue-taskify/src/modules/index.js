import { bootstrap as prepareApi } from './api'
import { bootstrap as prepareRouter } from './router'

export const bootstrap = async () => {
  await prepareApi()
  await prepareRouter()
}
