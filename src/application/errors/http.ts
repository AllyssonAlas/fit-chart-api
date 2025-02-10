export class UnauthorizedError extends Error {
  constructor(error?: Error) {
    super('Unauthorized..');
    this.name = 'UnauthorizedError';
    this.stack = error?.stack;
  }
}

export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again later');
    this.name = 'ServerError';
    this.stack = error?.stack;
  }
}
