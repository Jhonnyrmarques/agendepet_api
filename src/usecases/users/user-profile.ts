import { UserNotExistError } from '@/errors/user-not-exist-error'
import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

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
      throw new UserNotExistError()
    }

    return {
      user,
    }
  }
}
