export class InvalidCredentialsError extends Error {
  constructor() {
    super('Error: invalid credentials error.');
    this.name = 'InvalidCredentialsError';
  }
}
