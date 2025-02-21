import type { AuthedUser, User } from '@/domain/entities';

export const userMock = (input: Partial<User> = {}): User => ({
  id: 'any_user_id',
  name: 'any_user_name',
  email: 'any_email@mail.com',
  password: 'any_hashed_password',
  contact: 'any_contact',
  role: 'any_role',
  ...input,
});

export const authedUserMock = (): AuthedUser => ({
  authToken: 'any_token',
  name: 'any_user_name',
  email: 'any_email@mail.com',
});
