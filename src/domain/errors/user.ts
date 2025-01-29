export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Error: email is already in use.');
    this.name = 'EmailAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Error: invalid credentials error.');
    this.name = 'InvalidCredentialsError';
  }
}
