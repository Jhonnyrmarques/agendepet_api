import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/middlewares/verify-jwt'

import { userRegister } from '../controllers/users/user-register'
import { authentication } from '../controllers/users/authentication'
import { refreshToken } from '../controllers/users/refresh-token'
import { userUpdate } from '../controllers/users/user-update'
import { userProfile } from '../controllers/users/user-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authentication)

  app.patch('/token/refresh', refreshToken)

  app.get('/profile', { onRequest: [verifyJWT] }, userProfile)
  app.put('/users', { onRequest: [verifyJWT] }, userUpdate)
}
