import { type MockProxy, mock } from 'jest-mock-extended';

import type { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError, RequiredPermissionError } from '@/domain/errors';
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
    jwtValidator.validate.mockResolvedValue({
      id: 'any_user_id',
      role: 'any_role_name',
      permissions: ['any_permission'],
    });
  });

  beforeEach(() => {
    sut = setupAuthorization(jwtValidator);
  });

  it('Should call JwtTokenValidator with correct input', async () => {
    await sut(input);

    expect(jwtValidator.validate).toHaveBeenCalledWith({ token: input.authToken });
    expect(jwtValidator.validate).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if JwtTokenValidator throws', async () => {
    const error = new Error('token_validator_error');
    jwtValidator.validate.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw InvalidTokenError if JwtTokenValidator returns null', async () => {
    jwtValidator.validate.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidTokenError());
  });

  it('Should throw RequiredPermissionError if token permissions do not include requiredPermission', async () => {
    const promise = sut({ ...input, requiredPermission: 'invalid_required_permission' });

    await expect(promise).rejects.toThrow(new RequiredPermissionError());
  });
});
