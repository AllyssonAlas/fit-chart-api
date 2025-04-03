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

export namespace AssignUsersToGymRepository {
  export type Input = {
    gymId: string;
    emails: string[];
    usersType: string;
  };

  export type Output = void;
}

export interface AssignUsersToGymRepository {
  assignUsers(input: AssignUsersToGymRepository.Input): Promise<AssignUsersToGymRepository.Output>;
}

export namespace LoadGymExercisesRepository {
  export type Input = {
    gymId: string;
  };

  export type Output = {
    id: string;
    name: string;
    equipment?: string;
    category: string;
  }[];
}

export interface LoadGymExercisesRepository {
  loadExercises(input: LoadGymExercisesRepository.Input): Promise<LoadGymExercisesRepository.Output>;
}
