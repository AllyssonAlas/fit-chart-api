import { ExerciseRepository } from '@/infra/database/postgres/repositories';

export const makeExerciseRepository = (): ExerciseRepository => {
  return new ExerciseRepository();
};
