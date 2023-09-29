import { BreedAlreadyExistsError } from '@/errors/breed-already-exists-error'
import { makeBreedUpdateUseCase } from '@/usecases/factories/make-breed-update-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function breedUpdate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const breedUpdateBodySchema = z.object({
    name: z.string().optional(),
    kind: z.string().optional(),
  })

  const breedUpdateParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = breedUpdateParamsSchema.parse(request.params)
  const { name, kind } = breedUpdateBodySchema.parse(request.body)

  const breedUpdateUseCase = makeBreedUpdateUseCase()

  try {
    await breedUpdateUseCase.execute({ id, name, kind })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof BreedAlreadyExistsError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
