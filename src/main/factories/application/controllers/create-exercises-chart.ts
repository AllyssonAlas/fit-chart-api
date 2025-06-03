import { CreateExercisesChartController } from '@/application/controllers';
import { makeExercisesChartRepository } from '@/main/factories/infra/repositories';

export const makeCreateExercisesChartController = (): CreateExercisesChartController => {
  return new CreateExercisesChartController(makeExercisesChartRepository());
};
