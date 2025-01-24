import { type CreateUser, setupCreateUser } from '@/domain/usecases';
import { makeBcryptAdapter } from '@/main/factories/infra/gateways';
import { makeRoleRepository, makeUserRepository } from '@/main/factories/infra/repositories';

export const makeCreateUserUsecase = (): CreateUser => {
  return setupCreateUser(makeUserRepository(), makeRoleRepository(), makeBcryptAdapter());
};
