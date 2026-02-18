import type { AuthedUser, User } from '@/domain/entities';
import type { Address } from '@/domain/entities/generic-types';

export const addressMock = (input: Partial<Address> = {}): Address => ({
  city: 'any_city',
  neighborhood: 'any_neighborhood',
  number: 'any_number',
  postalCode: 'any_postal_code',
  state: 'any_state',
  street: 'any_street',
  complement: 'any_complement',
  ...input,
});

export const userMock = (input: Partial<User> = {}): User => ({
  id: 'any_user_id',
  name: 'any_user_name',
  email: 'any_email@mail.com',
  password: 'any_hashed_password',
  activeChartId: 'any_exercises_chart_id',
  contact: 'any_contact',
  role: 'any_role',
  ...input,
});

export const authedUserMock = (): AuthedUser => ({
  authToken: 'any_token',
  name: 'any_user_name',
  email: 'any_email@mail.com',
});
