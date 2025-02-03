import { sign } from 'jsonwebtoken';

import type { JwtTokenGenerator } from '@/domain/contracts/gateways';

export class JwtAdapter {
  constructor(private readonly secret: string) {}

  async generate({ expirationInMs, ...input }: JwtTokenGenerator.Input): Promise<void> {
    await sign(input, this.secret, { expiresIn: expirationInMs });
  }
}
