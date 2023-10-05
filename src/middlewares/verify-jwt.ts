import { FastifyReply, FastifyRequest } from 'fastify'

const myCustomMessages = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  badCookieRequestErrorMessage: 'Cookie could not be parsed in request',
  noAuthorizationInHeaderMessage:
    'No Authorization was found in request.headers',
  noAuthorizationInCookieMessage:
    'No Authorization was found in request.cookies',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenUntrusted: 'Untrusted authorization token',
  authorizationTokenUnsigned: 'Unsigned authorization token',

  authorizationTokenInvalid: (err: any) => {
    return `Authorization token is invalid: ${err.message}`
  },
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  const tokenHeader = request.headers.authorization

  if (!tokenHeader) {
    return reply.status(401).send({ message: 'Token is missing.' })
  }

  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({
      message: `${myCustomMessages.authorizationTokenInvalid(err)}`,
    })
  }
}
