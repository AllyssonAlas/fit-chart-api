import type { AuthedUser } from '@/domain/models';

export const authedUser = (): AuthedUser => ({
  authToken: 'any_token',
  name: 'any_user_name',
  email: 'any_email@mail.com',
});
