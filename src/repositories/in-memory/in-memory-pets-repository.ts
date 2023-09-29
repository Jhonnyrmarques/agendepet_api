import { Pet, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      breed_id: data.breed_id,
      name: data.name,
      kind: data.kind,
      gender: data.gender,
      size: data.size,
      age: new Decimal(data.age.toString()),
      observations: data.observations,
      created_at: new Date(),
      updated_at: null,
    }

    this.pets.push(pet)

    return pet
  }

  async findPetByNameAndKind(user_id: string, name: string, kind: string) {
    const pet = this.pets.find(
      (pet) =>
        pet.user_id === user_id && pet.name === name && pet.kind === kind,
    )

    if (!pet) {
      return null
    }

    return pet
  }

  async fetchPets(user_id: string, query: string, page: number) {
    const pets = this.pets
      .filter((pet) => {
        return (
          (pet.user_id === user_id && pet.name.includes(query)) ||
          pet.kind.includes(query)
        )
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}
