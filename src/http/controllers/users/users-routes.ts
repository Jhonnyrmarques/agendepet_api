import { FastifyInstance } from 'fastify'
import { userRegister } from './user-register'
import { authentication } from './authentication'
import { userProfile } from './user-profile'

import { verifyJWT } from '@/middlewares/verify-jwt'
import { userUpdate } from './user-update'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authentication)

  app.get('/profile', { onRequest: [verifyJWT] }, userProfile)
  app.put('/users', { onRequest: [verifyJWT] }, userUpdate)
}
