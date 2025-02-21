export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Error: email is already in use.');
    this.name = 'EmailAlreadyExistsError';
  }
}

export class EmailDoesNotExistError extends Error {
  constructor(email: string) {
    super(`Error: email ${email} does not exist.`);
    this.name = 'EmailDoesNotExistError';
  }
}
