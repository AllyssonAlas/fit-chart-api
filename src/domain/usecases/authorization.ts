import type { JwtTokenValidator } from '@/domain/contracts/gateways';

type Input = { authToken: string; requiredPermission: string };
type Output = void;
export type Authorization = (input: Input) => Promise<Output>;
type Setup = (token: JwtTokenValidator) => Authorization;

export const setupAuthorization: Setup = (token) => {
  return async ({ authToken }) => {
    await token.validate({ token: authToken });
  };
};
