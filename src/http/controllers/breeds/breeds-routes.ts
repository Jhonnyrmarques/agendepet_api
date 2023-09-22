import { FastifyInstance } from 'fastify'
import { breedCreate } from './breed-create'
import { verifyRole } from '@/middlewares/verify-role'
import { verifyJWT } from '@/middlewares/verify-jwt'

export async function breedsRoutes(app: FastifyInstance) {
  app.post(
    '/breed',
    { onRequest: [verifyJWT, verifyRole('ADMIN')] },
    breedCreate,
  )
}
