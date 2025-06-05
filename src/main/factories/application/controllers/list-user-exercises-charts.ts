import { ListUserExercisesChartsController } from '@/application/controllers';
import { makeExercisesChartRepository } from '@/main/factories/infra/repositories';

export const makeListUserExercisesChartsController = (): ListUserExercisesChartsController => {
  return new ListUserExercisesChartsController(makeExercisesChartRepository());
};
