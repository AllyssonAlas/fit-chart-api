import { type CreateExercisesChart, setupCreateExercisesChart } from '@/domain/usecases';
import { makeExercisesChartRepository, makeUserRepository } from '@/main/factories/infra/repositories';

export const makeCreateExercisesChartUsecase = (): CreateExercisesChart => {
  return setupCreateExercisesChart(makeExercisesChartRepository(), makeUserRepository());
};
