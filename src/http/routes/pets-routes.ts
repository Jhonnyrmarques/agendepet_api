import { FastifyInstance } from 'fastify'
import { petCreate } from '../controllers/pets/pet-create'
import { verifyJWT } from '@/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, petCreate)
}
