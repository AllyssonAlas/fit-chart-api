import { ExercisesChartRepository } from '@/infra/database/postgres/repositories';

export const makeExercisesChartRepository = (): ExercisesChartRepository => {
  return new ExercisesChartRepository();
};
