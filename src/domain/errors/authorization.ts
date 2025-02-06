export class InvalidTokenError extends Error {
  constructor() {
    super('Error: token is invalid.');
    this.name = 'InvalidTokenError';
  }
}
