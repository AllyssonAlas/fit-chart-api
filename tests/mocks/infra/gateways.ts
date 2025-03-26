import { sign } from 'jsonwebtoken';

import { AuthToken } from '@/domain/entities';
import { env } from '@/main/config/env';

export const authorizationTokenMock = (permission: string): string => {
  return sign({ id: 'any_user_id', role: 'any_role_name', permissions: [permission] }, env.secret, {
    expiresIn: AuthToken.expirationInMs / 1000,
  });
};
