import type { Gym } from '@/domain/entities';

export namespace SaveGymRepository {
  export type Input = Gym;

  export type Output = void;
}

export interface SaveGymRepository {
  save(input: SaveGymRepository.Input): Promise<SaveGymRepository.Output>;
}
