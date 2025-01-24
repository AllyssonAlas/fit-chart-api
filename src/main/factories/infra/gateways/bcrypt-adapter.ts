import { BcryptAdapter } from '@/infra/gateways';

import { env } from '@/main/config/env';

export const makeBcryptAdapter = (): BcryptAdapter => {
  return new BcryptAdapter(env.salt);
};
