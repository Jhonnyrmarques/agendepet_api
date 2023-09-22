export class BreedNotExistError extends Error {
  constructor() {
    super('Breed does not exist.')
  }
}
