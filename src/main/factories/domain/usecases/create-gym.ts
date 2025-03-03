import { type CreateGym, setupCreateGym } from '@/domain/usecases';
import { makeGymRepository, makeUserRepository } from '@/main/factories/infra/repositories';

export const makeCreateGymUsecase = (): CreateGym => {
  return setupCreateGym(makeUserRepository(), makeGymRepository());
};
