import { makeUserProfileUseCase } from '@/usecases/factories/make-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { undefined } from 'zod'

export async function userProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userProfileUseCase = makeUserProfileUseCase()

  const { user } = await userProfileUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
      role: undefined,
    },
  })
}
