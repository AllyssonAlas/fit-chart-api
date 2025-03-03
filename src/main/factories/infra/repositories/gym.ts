import { GymRepository } from '@/infra/database/postgres/repositories';

export const makeGymRepository = (): GymRepository => {
  return new GymRepository();
};
