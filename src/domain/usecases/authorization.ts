import type { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError, RequiredPermissionError } from '@/domain/errors';

type Input = { authToken: string; requiredPermission: string };
type Output = { userId: string };
export type Authorization = (input: Input) => Promise<Output>;
type Setup = (token: JwtTokenValidator) => Authorization;

export const setupAuthorization: Setup = (token) => {
  return async ({ authToken, requiredPermission }) => {
    const tokenData = await token.validate({ token: authToken });
    if (!tokenData) throw new InvalidTokenError();
    if (!tokenData.permissions.includes(requiredPermission)) throw new RequiredPermissionError();
    return { userId: tokenData.id };
  };
};
