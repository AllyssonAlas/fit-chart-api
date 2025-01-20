export namespace LoadRoleRepository {
  export type Input = {
    name: string;
  };

  export type Output = {
    id: string;
    name: string;
    permissions: string[];
  } | null;
}

export interface LoadRoleRepository {
  load(input: LoadRoleRepository.Input): Promise<LoadRoleRepository.Output>;
}
