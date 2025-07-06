import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function registerAuthRoutes (app: FastifyInstance) {
  app.get('/health', async () => ({ status: 'ok' }))

  app.post('/register', async (req, reply) => {
    const body = registerSchema.safeParse(req.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    const { email, password } = body.data

    // For now: simulate user creation with hash
    const passwordHash = await bcrypt.hash(password, 10)

    // Later: persist to DB
    console.log('Creating user:', { email, passwordHash })

    return reply.status(201).send({ message: 'User registered' })
  })
}
