import { UserNotExistError } from '@/errors/user-not-exist-error'
import { makeUserUpdateUseCase } from '@/usecases/factories/make-user-update-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function userUpdate(request: FastifyRequest, reply: FastifyReply) {
  const userUpdateBodySchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone: z.string().optional(),
  })

  const { first_name, last_name, phone } = userUpdateBodySchema.parse(
    request.body,
  )

  const userUpdateUseCase = makeUserUpdateUseCase()

  try {
    const { user } = await userUpdateUseCase.execute({
      id: request.user.sub,
      first_name,
      last_name,
      phone,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
        role: undefined,
      },
    })
  } catch (err) {
    if (err instanceof UserNotExistError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
