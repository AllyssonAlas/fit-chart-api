import { sign } from 'jsonwebtoken';

import type { JwtTokenGenerator } from '@/domain/contracts/gateways';

export class JwtAdapter implements JwtTokenGenerator {
  constructor(private readonly secret: string) {}

  async generate({ expirationInMs, ...input }: JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output> {
    const token = await sign(input, this.secret, { expiresIn: expirationInMs });
    return { token };
  }
}
