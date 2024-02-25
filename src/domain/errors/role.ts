export class NonexistentRoleError extends Error {
  constructor() {
    super('Error: role does not exist.');
    this.name = 'NonexistentRoleError';
  };
};
