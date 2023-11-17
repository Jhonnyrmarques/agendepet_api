import { Role, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

import { ErrorMessages } from '@/errors/error-messages'

interface UserRegisterUseCaseRequest {
  first_name: string
  last_name: string
  email: string
  password_hash: string
  phone: string
  role?: Role
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
    role,
  }: UserRegisterUseCaseRequest): Promise<UserRegisterUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findUserByEmail(email)
    const userPhoneAlreadyExists =
      await this.usersRepository.findUserByPhone(phone)

    if (userAlreadyExists) {
      throw new ErrorMessages('User already exists')
    }

    if (userPhoneAlreadyExists) {
      throw new ErrorMessages('Phone already exists.')
    }

    const password = await hash(password_hash, 6)

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      email,
      password_hash: password,
      phone,
      role,
    })

    return {
      user,
    }
  }
}
