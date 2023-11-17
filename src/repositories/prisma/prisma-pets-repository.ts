import { Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async fetchPets(user_id: string, query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        user_id,
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

    return pets
  }

  async findPetByNameAndSpecie(user_id: string, name: string, specie: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        user_id,
        name,
        specie,
      },
    })

    return pet
  }
}
