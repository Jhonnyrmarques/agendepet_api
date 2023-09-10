import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserRegisterUseCase } from '@/usecases/users/user-register'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userRegisterBodySchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password_hash: z.string().min(8),
    phone: z.string(),
  })

  const { first_name, last_name, email, password_hash, phone } =
    userRegisterBodySchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const userRegisterUseCase = new UserRegisterUseCase(usersRepository)

  try {
    await userRegisterUseCase.execute({
      first_name,
      last_name,
      email,
      password_hash,
      phone,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
