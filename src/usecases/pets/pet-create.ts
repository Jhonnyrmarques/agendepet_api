import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

import { ErrorMessages } from '@/errors/error-messages'

interface PetCreateUseCaseRequest {
  name: string
  user_id: string
  breed_id: string
  specie: string
  gender: string
  size: string
  age: number
  observations: string
}

interface PetCreateUseCaseResponse {
  pet: Pet
}

export class PetCreateUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    user_id,
    breed_id,
    specie,
    gender,
    size,
    age,
    observations,
  }: PetCreateUseCaseRequest): Promise<PetCreateUseCaseResponse> {
    const petExists = await this.petsRepository.findPetByNameAndSpecie(
      user_id,
      name,
      specie,
    )

    if (petExists) {
      throw new ErrorMessages('Pet already exists.')
    }

    const pet = await this.petsRepository.create({
      name,
      user_id,
      breed_id,
      specie,
      gender,
      size,
      age,
      observations,
    })

    return {
      pet,
    }
  }
}
