export namespace HashGenerator {
  export type Input = {
    plainText: string;
  };

  export type Output = {
    cipherText: string;
  };
}

export interface HashGenerator {
  generate(input: HashGenerator.Input): Promise<HashGenerator.Output>;
}

export namespace HashComparer {
  export type Input = {
    plainText: string;
    digest: string;
  };

  export type Output = {
    isValid: boolean;
  };
}

export interface HashComparer {
  compare(input: HashComparer.Input): Promise<HashComparer.Output>;
}
