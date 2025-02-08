import { JsonWebTokenError, NotBeforeError, TokenExpiredError, sign, verify } from 'jsonwebtoken';

import type { JwtTokenGenerator, JwtTokenValidator } from '@/domain/contracts/gateways';

export class JwtAdapter implements JwtTokenGenerator {
  constructor(private readonly secret: string) {}

  async generate({ expirationInMs, ...input }: JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output> {
    const token = sign(input, this.secret, { expiresIn: expirationInMs });
    return { token };
  }

  async validate({ token }: JwtTokenValidator.Input): Promise<void | null> {
    try {
      await verify(token, this.secret);
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof NotBeforeError || error instanceof JsonWebTokenError) {
        return null;
      }
      throw error;
    }
  }
}
