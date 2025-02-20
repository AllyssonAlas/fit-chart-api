export namespace LoadUserRepository {
  export type Input = {
    email: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    contact: string;
    address?: {
      number: string;
      street: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
      complement?: string;
    };
  } | null;
}

export interface LoadUserRepository {
  load(input: LoadUserRepository.Input): Promise<LoadUserRepository.Output>;
}

export namespace SaveUserRepository {
  export type Input = {
    name: string;
    email: string;
    password: string;
    role: string;
    contact: string;
    address: {
      number: string;
      street: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
      complement?: string;
    };
  };

  export type Output = void;
}

export interface SaveUserRepository {
  save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Output>;
}

export namespace LoadManyUsersRepository {
  export type Input = {
    emails: string[];
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    contact: string;
    address?: {
      number: string;
      street: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
      complement?: string;
    };
  }[];
}

export interface LoadManyUsersRepository {
  loadMany(input: LoadManyUsersRepository.Input): Promise<LoadManyUsersRepository.Output>;
}
