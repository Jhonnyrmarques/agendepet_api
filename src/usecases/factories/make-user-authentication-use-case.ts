import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticationUseCase } from '../users/authentication'

export function makeUserAuthenticationUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const userAuthenticationUseCase = new AuthenticationUseCase(usersRepository)

  return userAuthenticationUseCase
}
