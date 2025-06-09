import { CreateExercisesChartController } from '@/application/controllers';
import { makeCreateExercisesChartUsecase } from '@/main/factories/domain/usecases';

export const makeCreateExercisesChartController = (): CreateExercisesChartController => {
  return new CreateExercisesChartController(makeCreateExercisesChartUsecase());
};
