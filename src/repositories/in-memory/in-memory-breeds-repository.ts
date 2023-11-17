import { Breed, Prisma } from '@prisma/client'
import { BreedsRepository } from '../breeds-repository'
import { randomUUID } from 'crypto'

export class InMemoryBreedsReposiotry implements BreedsRepository {
  public breeds: Breed[] = []

  async create(data: Prisma.BreedCreateInput) {
    const breed = {
      id: data.id ?? randomUUID(),
      name: data.name,
      specie: data.specie,
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

    if (data.specie) {
      this.breeds[index].specie = data.specie.toString()
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

  async fetchBreeds(query: string, page: number) {
    const breeds = this.breeds
      .filter((breed) => {
        return breed.name.includes(query) || breed.specie.includes(query)
      })
      .slice((page - 1) * 20, page * 20)

    return breeds
  }
}
