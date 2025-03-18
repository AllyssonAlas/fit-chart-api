export class GymNotFoundError extends Error {
  constructor() {
    super('Error: gym was not found.');
    this.name = 'GymNotFoundError';
  }
}
