import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetCreateUseCase } from './pet-create'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryBreedsReposiotry } from '@/repositories/in-memory/in-memory-breeds-repository'

import { PetAlreadyExistsError } from '@/errors/pet-already-exists-error'

let petsRepository: InMemoryPetsRepository
let petCreateUseCase: PetCreateUseCase
let usersRepository: InMemoryUsersRepository
let breedsRepository: InMemoryBreedsReposiotry

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petCreateUseCase = new PetCreateUseCase(petsRepository)
    usersRepository = new InMemoryUsersRepository()
    breedsRepository = new InMemoryBreedsReposiotry()
  })

  it('must be able a user to register their pet', async () => {
    const user = await usersRepository.create({
      id: 'user-1',
      first_name: 'Joana',
      last_name: 'Souza',
      email: 'joana@email.com',
      password_hash: '123456',
      phone: '',
    })

    const breed = await breedsRepository.create({
      id: 'breed-1',
      name: 'Akita',
      kind: 'Cachorro',
    })

    const { pet } = await petCreateUseCase.execute({
      name: 'Pricesa',
      age: 8,
      gender: 'Fêmea',
      kind: 'Cachorro',
      size: 'Médio',
      breed_id: breed.id,
      user_id: user.id,
      observations: '',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register the same pet twice', async () => {
    const user = await usersRepository.create({
      id: 'user-2',
      first_name: 'Claudio',
      last_name: 'Souza',
      email: 'claudio@email.com',
      password_hash: '123456',
      phone: '',
    })

    const breed = await breedsRepository.create({
      id: 'breed-2',
      name: 'Beagle',
      kind: 'Cachorro',
    })

    await petCreateUseCase.execute({
      name: 'Rex',
      age: 10,
      gender: 'Macho',
      kind: 'Cachorro',
      size: 'Pequeno',
      breed_id: breed.id,
      user_id: user.id,
      observations: '',
    })

    await expect(() =>
      petCreateUseCase.execute({
        name: 'Rex',
        age: 10,
        gender: 'Macho',
        kind: 'Cachorro',
        size: 'Pequeno',
        breed_id: breed.id,
        user_id: user.id,
        observations: '',
      }),
    ).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })
})
