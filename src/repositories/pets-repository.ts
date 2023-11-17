import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchPets(user_id: string, query: string, page: number): Promise<Pet[]>
  findPetByNameAndSpecie(
    user_id: string,
    name: string,
    specie: string,
  ): Promise<Pet | null>
}
