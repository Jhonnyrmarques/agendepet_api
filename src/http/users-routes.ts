import { FastifyInstance } from 'fastify'
import { userRegister } from './controllers/user-register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
}
