import { BreedsRepository } from '@/repositories/breeds-repository'
import { BreedNotExistError } from '@/errors/breed-not-exist-error'

interface BreedUpdateUseCaseRequest {
  id: string
  name?: string
  kind?: string
}

export class BreedUpdateUseCase {
  constructor(private breedsRepository: BreedsRepository) {}

  async execute({ id, name, kind }: BreedUpdateUseCaseRequest) {
    const breedIdExists = await this.breedsRepository.findBreedById(id)

    if (!breedIdExists) {
      throw new BreedNotExistError()
    }

    await this.breedsRepository.update({ id, name, kind })
  }
}
