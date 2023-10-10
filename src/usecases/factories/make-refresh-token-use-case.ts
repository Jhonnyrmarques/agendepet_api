import { PrismaRefreshTokensRepository } from '@/repositories/prisma/prisma-refresh-tokens-repository'
import { RefreshTokenUseCase } from '../users/refresh-token'

export function makeRefreshTokenUseCase() {
  const refreshTokensRepository = new PrismaRefreshTokensRepository()
  const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokensRepository)

  return refreshTokenUseCase
}
