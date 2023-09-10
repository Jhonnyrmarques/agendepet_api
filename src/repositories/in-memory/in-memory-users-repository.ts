import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      isAdmin: data.isAdmin,
      created_at: new Date(),
      updated_at: null,
    }

    this.users.push(user)

    return user
  }

  async findUserByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
