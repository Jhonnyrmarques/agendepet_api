import { FastifyInstance } from 'fastify'

import { verifyRole } from '@/middlewares/verify-role'
import { verifyJWT } from '@/middlewares/verify-jwt'

import { breedCreate } from '../controllers/breeds/breed-create'
import { breedFetch } from '../controllers/breeds/breed-fetch'
import { breedUpdate } from '../controllers/breeds/breed-update'

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
