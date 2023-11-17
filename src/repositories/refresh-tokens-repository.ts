import { Prisma, RefreshToken } from '@prisma/client'

export interface RefreshTokensRepository {
  create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken>
  findRefreshTokenByUserId(user_id: string): Promise<RefreshToken | null>
  updateRefreshToken(
    data: Prisma.RefreshTokenUncheckedUpdateInput,
  ): Promise<RefreshToken>
  deleteById(id: string): Promise<void>
}
