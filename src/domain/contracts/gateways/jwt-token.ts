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

export namespace JwtTokenValidator {
  export type Input = {
    token: string;
  };

  export type Output = {
    id: string;
    role: string;
    permissions: string[];
  } | null;
}

export interface JwtTokenValidator {
  validate(input: JwtTokenValidator.Input): Promise<JwtTokenValidator.Output>;
}
