import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'

interface UserRegisterUseCaseRequest {
  first_name: string
  last_name: string
  email: string
  password_hash: string
  phone: string
  isAdmin: boolean
}

interface UserRegisterUseCaseResponse {
  user: User
}

export class UserRegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    first_name,
    last_name,
    email,
    password_hash,
    phone,
    isAdmin,
  }: UserRegisterUseCaseRequest): Promise<UserRegisterUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findUserByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const password = await hash(password_hash, 6)

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      email,
      password_hash: password,
      phone,
      isAdmin,
    })

    return {
      user,
    }
  }
}
