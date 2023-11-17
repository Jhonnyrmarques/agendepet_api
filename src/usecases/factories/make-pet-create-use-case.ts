import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetCreateUseCase } from '../pets/pet-create'

export function makePetCreateUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petCreateUseCase = new PetCreateUseCase(petsRepository)

  return petCreateUseCase
}
