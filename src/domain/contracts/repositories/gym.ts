import type { GymData } from '@/domain/entities';

export namespace SaveGymRepository {
  export type Input = GymData;

  export type Output = void;
}

export interface SaveGymRepository {
  save(input: SaveGymRepository.Input): Promise<SaveGymRepository.Output>;
}

export namespace LoadGymRepository {
  export type Input = { id: string };

  export type Output = GymData | null;
}

export interface LoadGymRepository {
  load(input: LoadGymRepository.Input): Promise<LoadGymRepository.Output>;
}
