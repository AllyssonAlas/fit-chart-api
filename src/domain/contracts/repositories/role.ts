export namespace LoadRoleRepository {
  export type Input = {
    name: string;
  };

  export type Output = {
    id: string;
    name: string;
  };
}

export interface LoadRoleRepository {
  load (input: LoadRoleRepository.Input): Promise<LoadRoleRepository.Output>
}
