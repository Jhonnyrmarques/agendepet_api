import { FastifyInstance } from 'fastify'
import { breedCreate } from './breed-create'
import { verifyRole } from '@/middlewares/verify-role'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { breedFetch } from './breed-fetch'
import { breedUpdate } from './breed-update'

export async function breedsRoutes(app: FastifyInstance) {
  app.post(
    '/breed',
    { onRequest: [verifyJWT, verifyRole('ADMIN')] },
    breedCreate,
  )

  app.get('/breeds', { onRequest: [verifyJWT] }, breedFetch)
  app.put(
    '/breeds/:id',
    { onRequest: [verifyJWT, verifyRole('ADMIN')] },
    breedUpdate,
  )
}
