import { Breed, Prisma } from '@prisma/client'
import { BreedsRepository } from '../breeds-repository'
import { randomUUID } from 'crypto'

export class InMemoryBreedsReposiotry implements BreedsRepository {
  public breeds: Breed[] = []

  async create(data: Prisma.BreedCreateInput) {
    const breed = {
      id: data.id ?? randomUUID(),
      name: data.name,
      kind: data.kind,
      created_at: new Date(),
      updated_at: null,
    }

    this.breeds.push(breed)

    return breed
  }

  async findBreedByName(name: string) {
    const breed = this.breeds.find((breed) => breed.name === name)

    if (!breed) {
      return null
    }

    return breed
  }

  async update(data: Prisma.BreedUpdateInput): Promise<void> {
    const index = this.breeds.findIndex((breed) => breed.id === data.id)

    if (data.name) {
      this.breeds[index].name = data.name.toString()
    }

    if (data.kind) {
      this.breeds[index].kind = data.kind.toString()
    }

    this.breeds[index].updated_at = new Date()
  }

  async findBreedById(id: string) {
    const breed = this.breeds.find((breed) => breed.id === id)

    if (!breed) {
      return null
    }

    return breed
  }
}
