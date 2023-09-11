import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
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
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
