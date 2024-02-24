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
    address: {
      number: string
      street: string
      neighborhood: string
      city: string
      state: string
      postalCode: string
      complement?: string
    };
  };
}

export interface LoadUserRepository {
  load (input: LoadUserRepository.Input): Promise<LoadUserRepository.Output>
}
