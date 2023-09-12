import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserProfileUseCase } from '../users/user-profile'

export function makeUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const userProfileUseCase = new UserProfileUseCase(usersRepository)

  return userProfileUseCase
}
