export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Error: email is already in use.');
    this.name = 'EmailAlreadyExistsError';
  };
};
