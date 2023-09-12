import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserUpdateUseCase } from '../users/user-update'

export function makeUserUpdateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const userUpdateUseCase = new UserUpdateUseCase(usersRepository)

  return userUpdateUseCase
}
