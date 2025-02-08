import jsonwebtoken, { NotBeforeError, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

import type { JwtTokenGenerator, JwtTokenValidator } from '@/domain/contracts/gateways';
import { JwtAdapter } from '@/infra/gateways';

jest.mock('jsonwebtoken');

describe('JwtAdapter,', () => {
  let sut: JwtAdapter;
  let fakeJwt: jest.Mocked<typeof jsonwebtoken>;
  let secret: string;
  let token: string;

  beforeAll(() => {
    fakeJwt = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>;
    secret = 'any_secret';
    token = 'any_token';
  });

  beforeEach(() => {
    sut = new JwtAdapter(secret);
  });

  describe('generate', () => {
    let input: JwtTokenGenerator.Input;
    let output: JwtTokenGenerator.Output;

    beforeAll(() => {
      input = {
        id: 'any_user_id',
        role: 'any_role',
        permissions: ['any_permission'],
        expirationInMs: 10000,
      };
      output = { token };
      fakeJwt.sign.mockImplementation(() => output.token);
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

  describe('validate', () => {
    let input: JwtTokenValidator.Input;
    let output: JwtTokenValidator.Output;

    beforeAll(() => {
      input = { token };
      output = {
        id: 'any_user_id',
        role: 'any_user_role',
        permissions: ['any_user_permission'],
      };
      fakeJwt.verify.mockImplementation(() => output);
    });

    it('Should call jsonwebtoken validate with correct input', async () => {
      await sut.validate(input);

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret);
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1);
    });

    it('Should rethrow if verify throws', async () => {
      const error = new Error('verify_error');
      jest.spyOn(fakeJwt, 'verify').mockImplementationOnce(() => {
        throw error;
      });

      const promise = sut.validate(input);

      await expect(promise).rejects.toThrow(error);
    });

    it('Should return null if verify throws TokenExpiredError', async () => {
      const error = new TokenExpiredError('token is expired', new Date());
      jest.spyOn(fakeJwt, 'verify').mockImplementationOnce(() => {
        throw error;
      });

      const result = await sut.validate({ token: 'invalid_token' });

      expect(result).toBeNull();
    });

    it('Should return null if verify throws NotBeforeError', async () => {
      const error = new NotBeforeError('token is invalid', new Date());
      jest.spyOn(fakeJwt, 'verify').mockImplementationOnce(() => {
        throw error;
      });

      const result = await sut.validate({ token: 'invalid_token' });

      expect(result).toBeNull();
    });

    it('Should return null if verify throws NotBeforeError', async () => {
      const result = await sut.validate({ token });

      expect(result).toEqual(output);
    });
  });
});
