import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  const tokenHeader = request.headers.authorization

  if (!tokenHeader) {
    return reply.status(401).send({ message: 'Token is missing.' })
  }

  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: `Invalid token: ${err}` })
  }
}
