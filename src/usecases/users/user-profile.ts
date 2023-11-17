import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

import { ErrorMessages } from '@/errors/error-messages'

interface UserProfileUseCaseRequest {
  userId: string
}

interface UserProfileUseCaseResponse {
  user: User
}

export class UserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: UserProfileUseCaseRequest): Promise<UserProfileUseCaseResponse> {
    const user = await this.usersRepository.findUserById(userId)

    if (!user) {
      throw new ErrorMessages('User does not exist.')
    }

    return {
      user,
    }
  }
}
