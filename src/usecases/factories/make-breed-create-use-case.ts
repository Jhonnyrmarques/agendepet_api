import { PrismaBreedsRepository } from '@/repositories/prisma/prisma-breeds-repository'
import { BreedCreateUseCase } from '../breeds/breed-create'

export function makeBreedCreateUseCase() {
  const breedsRepository = new PrismaBreedsRepository()
  const breedCreateUseCase = new BreedCreateUseCase(breedsRepository)

  return breedCreateUseCase
}
