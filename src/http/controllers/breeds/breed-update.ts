import { makeBreedUpdateUseCase } from '@/usecases/factories/make-breed-update-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { ErrorMessages } from '@/errors/error-messages'

export async function breedUpdate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const breedUpdateBodySchema = z.object({
    name: z.string().optional(),
    specie: z.string().optional(),
  })

  const breedUpdateParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = breedUpdateParamsSchema.parse(request.params)
  const { name, specie } = breedUpdateBodySchema.parse(request.body)

  const breedUpdateUseCase = makeBreedUpdateUseCase()

  try {
    await breedUpdateUseCase.execute({ id, name, specie })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ErrorMessages) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
