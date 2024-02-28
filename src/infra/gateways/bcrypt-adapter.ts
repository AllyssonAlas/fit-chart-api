import bcrypt from 'bcrypt';

import { HashGenerator } from '@/domain/contracts/gateways';

export class BcryptAdapter implements HashGenerator {
  constructor(private readonly salt: number) {}

  async generate({ plainText }: HashGenerator.Input): Promise<HashGenerator.Output> {
    const cipherText = await bcrypt.hash(plainText, this.salt);
    return { cipherText };
  }
}
