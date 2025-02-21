import type { User } from '@/domain/entities';

export namespace LoadUserRepository {
  export type Input = {
    email: string;
  };

  export type Output = (User & { id: string }) | null;
}

export interface LoadUserRepository {
  load(input: LoadUserRepository.Input): Promise<LoadUserRepository.Output>;
}

export namespace SaveUserRepository {
  export type Input = User;

  export type Output = void;
}

export interface SaveUserRepository {
  save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Output>;
}

export namespace LoadManyUsersRepository {
  export type Input = {
    emails: string[];
  };

  export type Output = Array<User & { id: string }>;
}

export interface LoadManyUsersRepository {
  loadMany(input: LoadManyUsersRepository.Input): Promise<LoadManyUsersRepository.Output>;
}
