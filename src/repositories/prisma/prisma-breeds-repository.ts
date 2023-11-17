import { Prisma } from '@prisma/client'
import { BreedsRepository } from '../breeds-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBreedsRepository implements BreedsRepository {
  async create(data: Prisma.BreedCreateInput) {
    const breed = await prisma.breed.create({
      data,
    })

    return breed
  }

  async findBreedByName(name: string) {
    const breed = await prisma.breed.findFirst({
      where: {
        name,
      },
    })

    return breed
  }

  async update(data: Prisma.BreedUpdateInput) {
    await prisma.breed.update({
      where: {
        id: data.id?.toString(),
      },
      data: {
        name: data.name,
        specie: data.specie,
      },
    })
  }

  async findBreedById(id: string) {
    const breed = await prisma.breed.findUnique({
      where: {
        id,
      },
    })

    return breed
  }

  async fetchBreeds(query: string, page: number) {
    const breeds = await prisma.breed.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            specie: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },

      take: 20,
      skip: (page - 1) * 20,
    })

    return breeds
  }
}
