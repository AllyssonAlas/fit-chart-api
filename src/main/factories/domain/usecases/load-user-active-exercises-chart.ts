import { type LoadUserActiveExercisesChart, setupLoadUserActiveExercisesChart } from '@/domain/usecases';
import { makeExercisesChartRepository, makeUserRepository } from '@/main/factories/infra/repositories';

export const makeLoadUserActiveExercisesChartUsecase = (): LoadUserActiveExercisesChart => {
  return setupLoadUserActiveExercisesChart(makeUserRepository(), makeExercisesChartRepository());
};
