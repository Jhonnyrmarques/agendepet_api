import { FastifyInstance } from 'fastify'
import { userRegister } from './controllers/user-register'
import { authentication } from './controllers/authentication'
import { userProfile } from './controllers/user-profile'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { userUpdate } from './controllers/user-update'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authentication)

  app.get('/profile', { onRequest: [verifyJWT] }, userProfile)
  app.put('/users', { onRequest: [verifyJWT] }, userUpdate)
}
