import { makePetCreateUseCase } from '@/usecases/factories/make-pet-create-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ErrorMessages } from '@/errors/error-messages'

import z from 'zod'

export async function petCreate(request: FastifyRequest, reply: FastifyReply) {
  const petCreateBodySchema = z.object({
    name: z.string(),
    breed_id: z.string(),
    specie: z.string(),
    gender: z.string(),
    size: z.string(),
    age: z.number(),
    observations: z.string(),
  })

  const { name, breed_id, specie, gender, size, age, observations } =
    petCreateBodySchema.parse(request.body)

  const { sub } = request.user

  const petCreateUseCase = makePetCreateUseCase()

  try {
    await petCreateUseCase.execute({
      name,
      breed_id,
      user_id: sub,
      specie,
      gender,
      size,
      age,
      observations,
    })

    reply.status(201).send()
  } catch (err) {
    if (err instanceof ErrorMessages) {
      return reply.status(409).send({ messgae: err.message })
    }
  }
}
