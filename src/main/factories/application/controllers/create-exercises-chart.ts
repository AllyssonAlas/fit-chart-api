import { CreateExercisesChartController } from '@/application/controllers';
import { makeExerciseRepository } from '@/main/factories/infra/repositories';

export const makeCreateExercisesChartController = (): CreateExercisesChartController => {
  return new CreateExercisesChartController(makeExerciseRepository());
};
