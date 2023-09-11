import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserRegisterUseCase } from './user-register'
import { UserUpdateUseCase } from './user-update'
import { UserNotExistError } from '@/errors/user-not-exist-error'

let usersRepository: InMemoryUsersRepository
let userRegisterUseCase: UserRegisterUseCase
let userUpdateUseCase: UserUpdateUseCase

describe('User Update Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    userUpdateUseCase = new UserUpdateUseCase(usersRepository)
    userRegisterUseCase = new UserRegisterUseCase(usersRepository)
  })

  it('should be possible to update user', async () => {
    const userCreated = await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    const { user } = await userUpdateUseCase.execute({
      id: userCreated.user.id,
      first_name: 'João',
    })

    expect(user.first_name).toEqual('João')
  })

  it('should not be possible to update user with wrong id', async () => {
    await expect(() =>
      userUpdateUseCase.execute({
        id: 'non-existent-id',
        first_name: 'João',
      }),
    ).rejects.toBeInstanceOf(UserNotExistError)
  })
})
