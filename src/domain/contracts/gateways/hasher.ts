export namespace HashGenerator {
  export type Input = {
    plainText: string;
  };

  export type Output = void
}

export interface HashGenerator {
  generate (input: HashGenerator.Input): Promise<HashGenerator.Output>
}
