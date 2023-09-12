import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async userUpdate(
    id: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
  ) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        first_name,
        last_name,
        phone,
      },
    })

    return user
  }
}
