import { BreedAlreadyExistsError } from '@/errors/breed-already-exists-error'
import { BreedsRepository } from '@/repositories/breeds-repository'
import { Breed } from '@prisma/client'

interface BreedCreateUseCaseRequest {
  name: string
  kind: string
}

interface BreedCreateUseCaseResponse {
  breed: Breed
}

export class BreedCreateUseCase {
  constructor(private breedsRepository: BreedsRepository) {}

  async execute({
    name,
    kind,
  }: BreedCreateUseCaseRequest): Promise<BreedCreateUseCaseResponse> {
    const breedExists = await this.breedsRepository.findBreedByName(name)

    if (breedExists) {
      throw new BreedAlreadyExistsError()
    }

    const breed = await this.breedsRepository.create({ name, kind })

    return {
      breed,
    }
  }
}
