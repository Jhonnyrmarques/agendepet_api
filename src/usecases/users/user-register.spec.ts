import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserRegisterUseCase } from './user-register'

import { ErrorMessages } from '@/errors/error-messages'

let usersRepository: InMemoryUsersRepository
let userRegisterUseCase: UserRegisterUseCase

describe('User Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    userRegisterUseCase = new UserRegisterUseCase(usersRepository)
  })

  it('should be possible to register a user', async () => {
    const { user } = await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be possible to register a user with an encrypted password', async () => {
    const { user } = await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    const correctlyHashedPassword = await compare('123456', user.password_hash)

    expect(correctlyHashedPassword).toBe(true)
  })

  it('should not be possible to register a user with an existing email', async () => {
    await userRegisterUseCase.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '1198523698',
    })

    await expect(() =>
      userRegisterUseCase.execute({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@email.com',
        password_hash: '123456',
        phone: '1198523698',
      }),
    ).rejects.toBeInstanceOf(ErrorMessages)
  })

  it('should not be possible to register a user with an existing cell phone', async () => {
    await userRegisterUseCase.execute({
      first_name: 'Ana',
      last_name: 'Julia',
      email: 'anajulia@email.com',
      password_hash: '12345678',
      phone: '1198523698',
    })

    await expect(() =>
      userRegisterUseCase.execute({
        first_name: 'Carla',
        last_name: 'Silva',
        email: 'carlasilva@email.com',
        password_hash: '12345678',
        phone: '1198523698',
      }),
    ).rejects.toBeInstanceOf(ErrorMessages)
  })
})
