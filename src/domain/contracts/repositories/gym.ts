export namespace SaveGymRepository {
  export type Input = {
    name: string;
    email?: string;
    contact: string;
    ownerEmail: string;
    administrators?: string[];
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

export interface SaveGymRepository {
  save(input: SaveGymRepository.Input): Promise<SaveGymRepository.Output>;
}
