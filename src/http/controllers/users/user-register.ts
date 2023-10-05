import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUserRegisterUseCase } from '@/usecases/factories/make-user-register-use-case'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { PhoneAlreadyExistsError } from '@/errors/phone-already-exists-error'

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

  const userRegisterUseCase = makeUserRegisterUseCase()

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
    if (
      error instanceof UserAlreadyExistsError ||
      error instanceof PhoneAlreadyExistsError
    ) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
