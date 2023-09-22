import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryBreedsReposiotry } from '@/repositories/in-memory/in-memory-breeds-repository'
import { BreedUpdateUseCase } from './breed-update'
import { BreedCreateUseCase } from './breed-create'

import { BreedNotExistError } from '@/errors/breed-not-exist-error'

let breedsRepository: InMemoryBreedsReposiotry
let breedUpdateUseCase: BreedUpdateUseCase
let breedCreateUseCase: BreedCreateUseCase

describe('Update Breed Use Case', () => {
  beforeEach(() => {
    breedsRepository = new InMemoryBreedsReposiotry()
    breedUpdateUseCase = new BreedUpdateUseCase(breedsRepository)
    breedCreateUseCase = new BreedCreateUseCase(breedsRepository)
  })

  it('should be possible to updated a breed', async () => {
    const { breed } = await breedCreateUseCase.execute({
      name: 'Pug',
      kind: 'Cachorro',
    })

    await breedUpdateUseCase.execute({ id: breed.id, name: 'Shiba' })

    expect(breed.name).toEqual('Shiba')
    expect(breed.updated_at).toContain(new Date())
  })

  it('should not be possible to update breed with wrong id', async () => {
    await expect(() =>
      breedUpdateUseCase.execute({
        id: 'wrong-id',
        name: 'Pinscher',
      }),
    ).rejects.toBeInstanceOf(BreedNotExistError)
  })
})
