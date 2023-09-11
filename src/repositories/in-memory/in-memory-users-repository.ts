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
      isAdmin: false,
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

  async findUserById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async userUpdate(
    id: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
  ) {
    const findIndex = this.users.findIndex((user) => user.id === id)

    if (findIndex >= 0) {
      if (first_name) {
        this.users[findIndex].first_name = first_name
      }

      if (last_name) {
        this.users[findIndex].last_name = last_name
      }

      if (phone) {
        this.users[findIndex].phone = phone
      }
    }

    return this.users[findIndex]
  }
}
