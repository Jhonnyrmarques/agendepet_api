import { PrismaBreedsRepository } from '@/repositories/prisma/prisma-breeds-repository'
import { BreedFetchUseCase } from '../breeds/breed-fetch'

export function makeBreedFetchUseCase() {
  const breedsRepository = new PrismaBreedsRepository()
  const breedFetchUseCase = new BreedFetchUseCase(breedsRepository)

  return breedFetchUseCase
}
