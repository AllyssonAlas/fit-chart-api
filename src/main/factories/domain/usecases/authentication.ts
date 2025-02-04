import { type Authentication, setupAuthentication } from '@/domain/usecases';
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/infra/gateways';
import { makeRoleRepository, makeUserRepository } from '@/main/factories/infra/repositories';

export const makeAuthenticationUsecase = (): Authentication => {
  return setupAuthentication(makeUserRepository(), makeBcryptAdapter(), makeRoleRepository(), makeJwtAdapter());
};
