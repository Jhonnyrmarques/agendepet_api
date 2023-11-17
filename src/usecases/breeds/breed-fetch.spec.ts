import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryBreedsReposiotry } from '@/repositories/in-memory/in-memory-breeds-repository'

import { BreedFetchUseCase } from './breed-fetch'

let breedsRepository: InMemoryBreedsReposiotry
let breedFetchUseCase: BreedFetchUseCase

describe('Fetch Breed Use Case', () => {
  beforeEach(() => {
    breedsRepository = new InMemoryBreedsReposiotry()
    breedFetchUseCase = new BreedFetchUseCase(breedsRepository)
  })

  it('should be possible to fetch a breed by the name', async () => {
    await breedsRepository.create({
      name: 'Poodle',
      specie: 'Cachorro',
    })

    await breedsRepository.create({
      name: 'Maltês',
      specie: 'Cachorro',
    })

    const { breeds } = await breedFetchUseCase.execute({
      query: 'Maltês',
      page: 1,
    })

    expect(breeds).toHaveLength(1)
    expect(breeds).toEqual([expect.objectContaining({ name: 'Maltês' })])
  })

  it('should be possible to fetch a breed by the kind', async () => {
    await breedsRepository.create({
      name: 'Poodle',
      specie: 'Cachorro',
    })

    await breedsRepository.create({
      name: 'Maltês',
      specie: 'Cachorro',
    })

    const { breeds } = await breedFetchUseCase.execute({
      query: 'Cachorro',
      page: 1,
    })

    expect(breeds).toHaveLength(2)
    expect(breeds).toEqual([
      expect.objectContaining({ specie: 'Cachorro' }),
      expect.objectContaining({ specie: 'Cachorro' }),
    ])
  })

  it('should be possible to fetch paginated breeds', async () => {
    for (let i = 1; i <= 22; i++) {
      await breedsRepository.create({
        name: `Poodle ${i}`,
        specie: 'Cachorro',
      })
    }

    const { breeds } = await breedFetchUseCase.execute({
      query: 'Poodle',
      page: 2,
    })

    expect(breeds).toHaveLength(2)
    expect(breeds).toEqual([
      expect.objectContaining({ name: 'Poodle 21' }),
      expect.objectContaining({ name: 'Poodle 22' }),
    ])
  })
})
