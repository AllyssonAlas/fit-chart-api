import { ListGymExercisesController } from '@/application/controllers';
import { makeGymRepository } from '@/main/factories/infra/repositories';

export const makeListGymExercisesController = (): ListGymExercisesController => {
  return new ListGymExercisesController(makeGymRepository());
};
