import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryBreedsReposiotry } from '@/repositories/in-memory/in-memory-breeds-repository'
import { BreedCreateUseCase } from './breed-create'

import { ErrorMessages } from '@/errors/error-messages'

let breedsRepository: InMemoryBreedsReposiotry
let breedCreateUseCase: BreedCreateUseCase

describe('Create Breed Use Case', () => {
  beforeEach(() => {
    breedsRepository = new InMemoryBreedsReposiotry()
    breedCreateUseCase = new BreedCreateUseCase(breedsRepository)
  })

  it('should be possible to create a breed', async () => {
    const { breed } = await breedCreateUseCase.execute({
      name: 'Beagle',
      specie: 'Cachorro',
    })

    expect(breed.id).toEqual(expect.any(String))
  })

  it('should not be possible to create a breed with an existing name', async () => {
    await breedCreateUseCase.execute({
      name: 'Border collie',
      specie: 'Cachorro',
    })

    await expect(() =>
      breedCreateUseCase.execute({
        name: 'Border collie',
        specie: 'Cachorro',
      }),
    ).rejects.toBeInstanceOf(ErrorMessages)
  })
})
