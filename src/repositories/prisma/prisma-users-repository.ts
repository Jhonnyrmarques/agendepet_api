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

  async userUpdate(data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id: data.id?.toString(),
      },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        updated_at: data.updated_at,
      },
    })

    return user
  }

  async findUserByPhone(phone: string) {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    })

    return user
  }
}
