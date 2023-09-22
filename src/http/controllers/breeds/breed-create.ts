import { BreedAlreadyExistsError } from '@/errors/breed-already-exists-error'
import { makeBreedCreateUseCase } from '@/usecases/factories/make-breed-create-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

export async function breedCreate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const breedCreateBodyScheema = z.object({
    name: z.string(),
    kind: z.string(),
  })

  const { name, kind } = breedCreateBodyScheema.parse(request.body)

  const breedCreateUsecase = makeBreedCreateUseCase()

  try {
    await breedCreateUsecase.execute({ name, kind })

    reply.status(201).send()
  } catch (err) {
    if (err instanceof BreedAlreadyExistsError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
