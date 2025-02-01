export namespace JwtTokenGenerator {
  export type Input = {
    id: string;
    role: string;
    permissions: string[];
    expirationInMs: number;
  };

  export type Output = {
    token: string;
  };
}

export interface JwtTokenGenerator {
  generate(input: JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output>;
}
