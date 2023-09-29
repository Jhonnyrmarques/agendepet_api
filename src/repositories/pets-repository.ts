import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  listPetsByUser(user_id: string): Promise<Pet[] | null>
  findPetByNameAndKind(
    user_id: string,
    name: string,
    kind: string,
  ): Promise<Pet | null>
}
