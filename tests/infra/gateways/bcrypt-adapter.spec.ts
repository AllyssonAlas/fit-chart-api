import bcrypt from 'bcrypt';

import type { HashComparer, HashGenerator } from '@/domain/contracts/gateways';
import { BcryptAdapter } from '@/infra/gateways';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter;
  let fakeBcrypt: jest.Mocked<typeof bcrypt>;
  let salt: number;
  let plainText: string;

  beforeAll(() => {
    plainText = 'any_value';
    salt = 1;
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
  });

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  describe('generate', () => {
    let input: HashGenerator.Input;
    let output: HashGenerator.Output;

    beforeAll(() => {
      input = { plainText };
      output = { cipherText: 'hashed_value' };
      fakeBcrypt.hash.mockImplementation(() => output.cipherText);
    });

    it('Should call hash with correct input', async () => {
      await sut.generate(input);

      expect(fakeBcrypt.hash).toHaveBeenCalledWith(plainText, salt);
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1);
    });

    it('Should rethrow if hash throws', async () => {
      const error = new Error('hash_error');
      jest.spyOn(fakeBcrypt, 'hash').mockImplementationOnce(() => {
        throw error;
      });

      const promise = sut.generate(input);

      await expect(promise).rejects.toThrow(error);
    });

    it('Should return correct output', async () => {
      const result = await sut.generate(input);

      expect(result).toEqual(output);
    });
  });

  describe('compare', () => {
    let input: HashComparer.Input;
    let output: HashComparer.Output;

    beforeAll(() => {
      input = { plainText, digest: 'any_digest' };
      output = { isValid: true };
      fakeBcrypt.compare.mockImplementation(() => output.isValid);
    });

    it('Should call compare with correct input', async () => {
      await sut.compare(input);

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plainText, input.digest);
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1);
    });

    it('Should rethrow if compare throws', async () => {
      const error = new Error('compare_error');
      jest.spyOn(fakeBcrypt, 'compare').mockImplementationOnce(() => {
        throw error;
      });

      const promise = sut.compare(input);

      await expect(promise).rejects.toThrow(error);
    });

    it('Should return correct output on success', async () => {
      const result = await sut.compare(input);

      expect(result).toEqual(output);
    });
  });
});
