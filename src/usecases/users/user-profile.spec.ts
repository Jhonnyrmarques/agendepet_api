import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserProfileUseCase } from './user-profile'
import { UserRegisterUseCase } from './user-register'

let usersRepository: InMemoryUsersRepository
let userRegisterUseCase: UserRegisterUseCase
let userProfileUseCase: UserProfileUseCase

describe('User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    userRegisterUseCase = new UserRegisterUseCase(usersRepository)
    userProfileUseCase = new UserProfileUseCase(usersRepository)
  })

  it('should be possible to get profile user', async () => {
    const userCreated = await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    const { user } = await userProfileUseCase.execute({
      userId: userCreated.user.id,
    })

    expect(user.first_name).toEqual('John')
  })

  it('should not be possible to get profile user with wrong id', async () => {
    await expect(() =>
      userProfileUseCase.execute({
        userId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
