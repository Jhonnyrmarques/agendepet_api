import { PrismaBreedsRepository } from '@/repositories/prisma/prisma-breeds-repository'
import { BreedUpdateUseCase } from '../breeds/breed-update'

export function makeBreedUpdateUseCase() {
  const breedsRepository = new PrismaBreedsRepository()
  const breedUpdateUseCase = new BreedUpdateUseCase(breedsRepository)

  return breedUpdateUseCase
}
