import type { User } from '@/domain/entities';

export namespace LoadUserByEmailRepository {
  export type Input = {
    email: string;
  };

  export type Output = User | null;
}

export interface LoadUserByEmailRepository {
  loadByEmail(input: LoadUserByEmailRepository.Input): Promise<LoadUserByEmailRepository.Output>;
}

export namespace LoadUserByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = User;
}

export interface LoadUserByIdRepository {
  loadById(input: LoadUserByIdRepository.Input): Promise<LoadUserByIdRepository.Output>;
}

export namespace CreateUserRepository {
  export type Input = User;

  export type Output = void;
}

export interface CreateUserRepository {
  create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output>;
}

export namespace LoadManyUsersRepository {
  export type Input = {
    emails: string[];
  };

  export type Output = User[];
}

export interface LoadManyUsersRepository {
  loadMany(input: LoadManyUsersRepository.Input): Promise<LoadManyUsersRepository.Output>;
}

export namespace UpdateUserActiveExercisesChartRepository {
  export type Input = {
    exercisesChartId: string;
    userId: string;
  };

  export type Output = void;
}

export interface UpdateUserActiveExercisesChartRepository {
  updateActiveChart(
    input: UpdateUserActiveExercisesChartRepository.Input,
  ): Promise<UpdateUserActiveExercisesChartRepository.Output>;
}
