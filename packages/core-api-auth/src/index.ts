import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { registerAuthRoutes } from './routes/auth'

/**
 * Fastify plugin to register core authentication routes.
 * Should be used in apps like `api-auth`.
 */
export async function registerCoreAuthPlugin (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
) {
  app.register(registerAuthRoutes, { prefix: '/auth' })
}
