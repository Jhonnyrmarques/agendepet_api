import { PetAlreadyExistsError } from '@/errors/pet-already-exists-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface PetCreateUseCaseRequest {
  name: string
  user_id: string
  breed_id: string
  kind: string
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
    kind,
    gender,
    size,
    age,
    observations,
  }: PetCreateUseCaseRequest): Promise<PetCreateUseCaseResponse> {
    const petExists = await this.petsRepository.findPetByNameAndKind(
      user_id,
      name,
      kind,
    )

    if (petExists) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create({
      name,
      user_id,
      breed_id,
      kind,
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
