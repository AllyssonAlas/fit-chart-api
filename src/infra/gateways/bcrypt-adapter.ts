import { compare, hash } from 'bcrypt';

import type { HashComparer, HashGenerator } from '@/domain/contracts/gateways';

export class BcryptAdapter implements HashGenerator {
  constructor(private readonly salt: number) {}

  async generate({ plainText }: HashGenerator.Input): Promise<HashGenerator.Output> {
    const cipherText = await hash(plainText, this.salt);
    return { cipherText };
  }

  async compare({ plainText, digest }: HashComparer.Input): Promise<void> {
    await compare(plainText, digest);
  }
}
