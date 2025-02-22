import type { GymData } from '@/domain/entities';

export namespace SaveGymRepository {
  export type Input = GymData;

  export type Output = void;
}

export interface SaveGymRepository {
  save(input: SaveGymRepository.Input): Promise<SaveGymRepository.Output>;
}
