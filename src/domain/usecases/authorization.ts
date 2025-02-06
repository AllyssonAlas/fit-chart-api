import type { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError } from '@/domain/errors';

type Input = { authToken: string; requiredPermission: string };
type Output = void;
export type Authorization = (input: Input) => Promise<Output>;
type Setup = (token: JwtTokenValidator) => Authorization;

export const setupAuthorization: Setup = (token) => {
  return async ({ authToken }) => {
    const tokenData = await token.validate({ token: authToken });
    if (!tokenData) throw new InvalidTokenError();
  };
};
