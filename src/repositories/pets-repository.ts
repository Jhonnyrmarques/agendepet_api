import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchPets(user_id: string, query: string, page: number): Promise<Pet[]>
  findPetByNameAndKind(
    user_id: string,
    name: string,
    kind: string,
  ): Promise<Pet | null>
}
