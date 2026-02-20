import { LoadUserActiveExercisesChartController } from '@/application/controllers';
import { makeLoadUserActiveExercisesChartUsecase } from '@/main/factories/domain/usecases';

export const makeLoadUserActiveExercisesChartController = (): LoadUserActiveExercisesChartController => {
  return new LoadUserActiveExercisesChartController(makeLoadUserActiveExercisesChartUsecase());
};
