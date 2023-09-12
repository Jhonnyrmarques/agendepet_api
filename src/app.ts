import fastify from 'fastify'

// Routes
import { usersRoutes } from './http/users-routes'

import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)

// Formated Erros
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV === 'dev') {
    console.error(error)
  }

  reply.status(500).send({ message: 'Internal server error.' })
})
