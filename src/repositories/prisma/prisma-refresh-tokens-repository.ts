import { Prisma } from '@prisma/client'
import { RefreshTokensRepository } from '../refresh-tokens-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    const refresh_token = await prisma.refreshToken.create({
      data,
    })

    return refresh_token
  }

  async findRefreshTokenByUserId(user_id: string) {
    const refresh_token = await prisma.refreshToken.findFirst({
      where: {
        user_id,
      },
    })

    return refresh_token
  }

  async deleteById(id: string) {
    await prisma.refreshToken.delete({
      where: {
        id,
      },
    })
  }

  async updateRefreshToken(data: Prisma.RefreshTokenUncheckedUpdateInput) {
    const refreshToken = await prisma.refreshToken.update({
      where: {
        id: data.id?.toString(),
      },
      data: {
        refresh_token: data.refresh_token,
      },
    })

    return refreshToken
  }
}
