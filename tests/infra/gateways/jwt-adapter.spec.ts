import jsonwebtoken from 'jsonwebtoken';

import type { JwtTokenGenerator } from '@/domain/contracts/gateways';
import { JwtAdapter } from '@/infra/gateways';

jest.mock('jsonwebtoken');

describe('JwtAdapter,', () => {
  let sut: JwtAdapter;
  let fakeJwt: jest.Mocked<typeof jsonwebtoken>;
  let input: JwtTokenGenerator.Input;
  let output: JwtTokenGenerator.Output;
  let secret: string;

  beforeAll(() => {
    fakeJwt = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>;
    secret = 'any_secret';
    input = {
      id: 'any_user_id',
      role: 'any_role',
      permissions: ['any_permission'],
      expirationInMs: 10000,
    };
    output = { token: 'any_token' };
    fakeJwt.sign.mockImplementation(() => output.token);
  });

  beforeEach(() => {
    sut = new JwtAdapter(secret);
  });

  it('Should call jsonwebtoken sign with correct input', async () => {
    const { expirationInMs, ...inputData } = input;

    await sut.generate(input);

    expect(fakeJwt.sign).toHaveBeenCalledWith(inputData, secret, { expiresIn: expirationInMs });
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if sign throws', async () => {
    const error = new Error('sign_error');
    jest.spyOn(fakeJwt, 'sign').mockImplementationOnce(() => {
      throw error;
    });

    const promise = sut.generate(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should return correct output on success', async () => {
    const result = await sut.generate(input);

    expect(result).toEqual(output);
  });
});
