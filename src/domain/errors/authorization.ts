export class InvalidTokenError extends Error {
  constructor() {
    super('Error: token is invalid.');
    this.name = 'InvalidTokenError';
  }
}

export class RequiredPermissionError extends Error {
  constructor() {
    super('Error: permission required not found');
    this.name = 'RequiredPermissionError';
  }
}
