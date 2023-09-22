import { BreedsRepository } from '@/repositories/breeds-repository'
import { Breed } from '@prisma/client'

interface BreedFetchRequest {
  query: string
  page: number
}

interface BreedFetchResponse {
  breeds: Breed[]
}

export class BreedFetchUseCase {
  constructor(private breedsReposiotry: BreedsRepository) {}

  async execute({
    query,
    page,
  }: BreedFetchRequest): Promise<BreedFetchResponse> {
    const breeds = await this.breedsReposiotry.fetchBreeds(query, page)

    return {
      breeds,
    }
  }
}
