import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

import { errorTokenMessagesReturn } from '../../src/utils/jwtmessages'

interface Payload {
  sub: string
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  const tokenHeader = request.headers.authorization

  if (!tokenHeader) {
    return reply.status(401).send({ message: 'Token is missing.' })
  }

  try {
    const { sub } = (await request.jwtVerify()) as Payload
    const user = new PrismaUsersRepository()
    const userExists = await user.findUserById(sub)

    if (!userExists) {
      return reply.status(404).send({ message: 'User does not exits' })
    }
  } catch (err) {
    return reply.status(401).send({
      message: `${errorTokenMessagesReturn.authorizationTokenInvalid(err)}`,
    })
  }
}
