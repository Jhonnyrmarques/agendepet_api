import { makeBreedFetchUseCase } from '@/usecases/factories/make-breed-fetch-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function breedFetch(request: FastifyRequest, reply: FastifyReply) {
  const breedFetchQuerySchema = z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = breedFetchQuerySchema.parse(request.query)

  const fetchBreedsUseCase = makeBreedFetchUseCase()

  const { breeds } = await fetchBreedsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    breeds,
  })
}
