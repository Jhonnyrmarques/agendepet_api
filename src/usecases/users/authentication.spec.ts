import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserRegisterUseCase } from './user-register'

import { AuthenticationUseCase } from './authentication'
import { ErrorMessages } from '@/errors/error-messages'

let usersRepository: InMemoryUsersRepository
let userRegisterUseCase: UserRegisterUseCase
let authentication: AuthenticationUseCase

describe('User Authentication Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authentication = new AuthenticationUseCase(usersRepository)
    userRegisterUseCase = new UserRegisterUseCase(usersRepository)
  })

  it('should be possible to authenticate', async () => {
    await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    const { user } = await authentication.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.email).toEqual('johndoe@email.com')
  })

  it('should not be possible to authenticate with an invalid email', async () => {
    await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    await expect(() =>
      authentication.execute({
        email: 'johndoee@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ErrorMessages)
  })

  it('should not be possible to authenticate with an invalid password', async () => {
    await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    await expect(() =>
      authentication.execute({
        email: 'johndoe@email.com',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(ErrorMessages)
  })
})
