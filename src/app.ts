import fastify from 'fastify'

// Routes
import { usersRoutes } from './http/routes/users-routes'
import { breedsRoutes } from './http/routes/breeds-routes'

import { ZodError } from 'zod'
import { env } from './env'

// JWT
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: env.JWT_TOKEN_EXPIRESS,
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(breedsRoutes)

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
