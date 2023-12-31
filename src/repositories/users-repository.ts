import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserByPhone(phone: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  userUpdate(data: Prisma.UserUpdateInput): Promise<User>
}
