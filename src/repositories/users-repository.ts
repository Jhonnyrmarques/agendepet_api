import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  userUpdate(
    id: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
  ): Promise<User>
}
