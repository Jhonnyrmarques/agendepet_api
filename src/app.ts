import fastify from 'fastify'

// Routes
import { usersRoutes } from './http/users-routes'

export const app = fastify()

app.register(usersRoutes)
