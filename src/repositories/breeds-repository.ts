import { Breed, Prisma } from '@prisma/client'

export interface BreedsRepository {
  create(data: Prisma.BreedCreateInput): Promise<Breed>
  findBreedByName(name: string): Promise<Breed | null>
  update(data: Prisma.BreedUpdateInput): Promise<void>
  findBreedById(id: string): Promise<Breed | null>
  fetchBreeds(query: string, page: number): Promise<Breed[]>
}
