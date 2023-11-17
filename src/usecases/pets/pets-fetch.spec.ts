import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { PetsFetchUseCase } from './pets-fetch'

let petsRepository: InMemoryPetsRepository
let petsFetchUseCase: PetsFetchUseCase
let usersRepository: InMemoryUsersRepository

describe('Fetch Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsFetchUseCase = new PetsFetchUseCase(petsRepository)
    usersRepository = new InMemoryUsersRepository()
  })

  it('must be able a user to fetch their pet', async () => {
    const user = await usersRepository.create({
      id: 'user-1',
      first_name: 'Joana',
      last_name: 'Souza',
      email: 'joana@email.com',
      password_hash: '123456',
      phone: '',
    })

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pricesa',
      age: 8,
      gender: 'Fêmea',
      specie: 'Cachorro',
      size: 'Médio',
      breed_id: 'breedId-1',
      user_id: user.id,
      observations: '',
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Francisco',
      age: 10,
      gender: 'Macho',
      specie: 'Cachorro',
      size: 'Pequeno',
      breed_id: 'breedId-2',
      user_id: user.id,
      observations: '',
    })

    const { pets } = await petsFetchUseCase.execute({
      user_id: user.id,
      query: 'Pricesa',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Pricesa' })])
  })
})
