import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUserAuthenticationUseCase } from '@/usecases/factories/make-user-authentication-use-case'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { env } from '@/env'

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
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: env.JWT_REFRESH_TOKEN_EXPIRESS,
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
