import { ErrorMessages } from '@/errors/error-messages'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  user: User
}

export class AuthenticationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (!user) {
      throw new ErrorMessages('Invalid credential.')
    }

    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      throw new ErrorMessages('Invalid credential.')
    }

    return {
      user,
    }
  }
}
