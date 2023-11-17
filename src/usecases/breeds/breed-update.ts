import { ErrorMessages } from '@/errors/error-messages'
import { BreedsRepository } from '@/repositories/breeds-repository'

interface BreedUpdateUseCaseRequest {
  id: string
  name?: string
  specie?: string
}

export class BreedUpdateUseCase {
  constructor(private breedsRepository: BreedsRepository) {}

  async execute({ id, name, specie }: BreedUpdateUseCaseRequest) {
    const breedIdExists = await this.breedsRepository.findBreedById(id)

    if (!breedIdExists) {
      throw new ErrorMessages('Breed does not exist.')
    }

    await this.breedsRepository.update({ id, name, specie })
  }
}
