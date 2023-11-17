import { BreedsRepository } from '@/repositories/breeds-repository'
import { Breed } from '@prisma/client'

import { ErrorMessages } from '@/errors/error-messages'

interface BreedCreateUseCaseRequest {
  name: string
  specie: string
}

interface BreedCreateUseCaseResponse {
  breed: Breed
}

export class BreedCreateUseCase {
  constructor(private breedsRepository: BreedsRepository) {}

  async execute({
    name,
    specie,
  }: BreedCreateUseCaseRequest): Promise<BreedCreateUseCaseResponse> {
    const breedExists = await this.breedsRepository.findBreedByName(name)

    if (breedExists) {
      throw new ErrorMessages('Breed already exists.')
    }

    const breed = await this.breedsRepository.create({ name, specie })

    return {
      breed,
    }
  }
}
