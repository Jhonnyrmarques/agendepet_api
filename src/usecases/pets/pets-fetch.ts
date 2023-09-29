import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface PetsFetchUseCaseRequest {
  user_id: string
  query: string
  page: number
}

interface PetsFetchUseCaseResponse {
  pets: Pet[]
}

export class PetsFetchUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    user_id,
    query,
    page,
  }: PetsFetchUseCaseRequest): Promise<PetsFetchUseCaseResponse> {
    const pets = await this.petsRepository.fetchPets(user_id, query, page)

    return {
      pets,
    }
  }
}
