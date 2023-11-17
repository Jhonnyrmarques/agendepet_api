import { makeBreedCreateUseCase } from '@/usecases/factories/make-breed-create-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ErrorMessages } from '@/errors/error-messages'

import z from 'zod'

export async function breedCreate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const breedCreateBodyScheema = z.object({
    name: z.string(),
    specie: z.string(),
  })

  const { name, specie } = breedCreateBodyScheema.parse(request.body)

  const breedCreateUsecase = makeBreedCreateUseCase()

  try {
    await breedCreateUsecase.execute({ name, specie })

    reply.status(201).send()
  } catch (err) {
    if (err instanceof ErrorMessages) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
