import { type MockProxy, mock } from 'jest-mock-extended';

import type { JwtTokenValidator } from '@/domain/contracts/gateways';
import { type Authorization, setupAuthorization } from '@/domain/usecases';

describe('Authorization', () => {
  const input = {
    authToken: 'any_token',
    requiredPermission: 'any_permission',
  };

  let sut: Authorization;
  let jwtValidator: MockProxy<JwtTokenValidator>;

  beforeAll(() => {
    jwtValidator = mock();
  });

  beforeEach(() => {
    sut = setupAuthorization(jwtValidator);
  });

  it('Should call JwtTokenValidator with correct input', async () => {
    await sut(input);

    expect(jwtValidator.validate).toHaveBeenCalledWith({ token: input.authToken });
    expect(jwtValidator.validate).toHaveBeenCalledTimes(1);
  });
});
