import { JsonWebTokenError, NotBeforeError, TokenExpiredError, sign, verify } from 'jsonwebtoken';

import type { JwtTokenGenerator, JwtTokenValidator } from '@/domain/contracts/gateways';

export class JwtAdapter implements JwtTokenGenerator, JwtTokenValidator {
  constructor(private readonly secret: string) {}

  async generate({ expirationInMs, ...input }: JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output> {
    const token = sign(input, this.secret, { expiresIn: expirationInMs });
    return { token };
  }

  async validate({ token }: JwtTokenValidator.Input): Promise<JwtTokenValidator.Output> {
    try {
      const tokenData = await verify(token, this.secret);
      return tokenData as JwtTokenValidator.Output;
    } catch (error) {
      const findLibError = [TokenExpiredError, NotBeforeError, JsonWebTokenError].find(
        (libError) => error instanceof libError,
      );
      if (findLibError) return null;
      throw error;
    }
  }
}
