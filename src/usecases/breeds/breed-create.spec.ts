import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryBreedsReposiotry } from '@/repositories/in-memory/in-memory-breeds-repository'
import { BreedCreateUseCase } from './breed-create'
import { BreedAlreadyExistsError } from '@/errors/breed-already-exists-error'

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
      kind: 'Cachorro',
    })

    expect(breed.id).toEqual(expect.any(String))
  })

  it('should not be possible to create a breed with an existing name', async () => {
    await breedCreateUseCase.execute({
      name: 'Border collie',
      kind: 'Cachorro',
    })

    await expect(() =>
      breedCreateUseCase.execute({
        name: 'Border collie',
        kind: 'Cachorro',
      }),
    ).rejects.toBeInstanceOf(BreedAlreadyExistsError)
  })
})
