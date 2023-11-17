import { ErrorMessages } from '@/errors/error-messages'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface UserUpdateUseCaseRequest {
  id: string
  first_name?: string
  last_name?: string
  phone?: string
}

interface UserUpdateUseCaseResponse {
  user: User
}

export class UserUpdateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    first_name,
    last_name,
    phone,
  }: UserUpdateUseCaseRequest): Promise<UserUpdateUseCaseResponse> {
    const userExists = await this.usersRepository.findUserById(id)

    if (!userExists) {
      throw new ErrorMessages('User not exists')
    }

    const user = await this.usersRepository.userUpdate({
      id,
      first_name,
      last_name,
      phone,
      updated_at: new Date(),
    })

    return {
      user,
    }
  }
}
