import { type AssignUsersToGym, setupAssignUsersToGym } from '@/domain/usecases';
import { makeGymRepository, makeUserRepository } from '@/main/factories/infra/repositories';

export const makeAssignUsersToGymUsecase = (): AssignUsersToGym => {
  return setupAssignUsersToGym(makeGymRepository(), makeUserRepository());
};
