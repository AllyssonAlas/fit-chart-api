import type { AuthedUser } from '@/domain/entities';

export const authedUserMock = (): AuthedUser => ({
  authToken: 'any_token',
  name: 'any_user_name',
  email: 'any_email@mail.com',
});
