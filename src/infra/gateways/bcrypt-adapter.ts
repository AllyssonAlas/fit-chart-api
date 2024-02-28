import bcrypt from 'bcrypt';

import { HashGenerator } from '@/domain/contracts/gateways';

export class BcryptAdapter {
  constructor(private readonly salt: number) {}

  async generate({ plainText }: HashGenerator.Input): Promise<void> {
    await bcrypt.hash(plainText, this.salt);
  }
}
