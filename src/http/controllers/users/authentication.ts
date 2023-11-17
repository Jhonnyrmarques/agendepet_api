import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUserAuthenticationUseCase } from '@/usecases/factories/make-user-authentication-use-case'

import { env } from '@/env'

import { ErrorMessages } from '@/errors/error-messages'
import { makeRefreshTokenUseCase } from '@/usecases/factories/make-refresh-token-use-case'

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
          expiresIn: env.JWT_TOKEN_EXPIRESS,
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

    const refreshTokenUseCase = makeRefreshTokenUseCase()

    await refreshTokenUseCase.execute({
      refresh_token: refreshToken,
      user_id: user.id,
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
        user: { ...user, password_hash: undefined },
      })
  } catch (err) {
    if (err instanceof ErrorMessages) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
