import { UserRepository } from '@/infra/database/postgres/repositories';

export const makeUserRepository = (): UserRepository => {
  return new UserRepository();
};
