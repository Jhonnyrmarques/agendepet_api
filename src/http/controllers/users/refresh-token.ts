import { env } from '@/env'
import { makeRefreshTokenUseCase } from '@/usecases/factories/make-refresh-token-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })

  const { role, sub } = request.user

  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
        expiresIn: env.JWT_TOKEN_EXPIRESS,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub,
        expiresIn: env.JWT_REFRESH_TOKEN_EXPIRESS,
      },
    },
  )

  const refreshTokenUseCase = makeRefreshTokenUseCase()

  await refreshTokenUseCase.execute({
    refresh_token: refreshToken,
    user_id: sub,
  })

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
}
