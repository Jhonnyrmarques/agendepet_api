import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUserAuthenticationUseCase } from '@/usecases/factories/make-user-authentication-use-case'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userAuthenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = userAuthenticationBodySchema.parse(request.body)

  const userAuthenticationUseCase = makeUserAuthenticationUseCase()

  try {
    const { user } = await userAuthenticationUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '30m',
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
