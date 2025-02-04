import bcrypt from 'bcrypt';

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
    fakeBcrypt.hash.mockImplementation(() => 'hashed_value');
  });

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  describe('generate', () => {
    it('Should call hash with correct input', async () => {
      await sut.generate({ plainText });

      expect(fakeBcrypt.hash).toHaveBeenCalledWith(plainText, salt);
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1);
    });

    it('Should rethrow if hash throws', async () => {
      const error = new Error('hash_error');
      jest.spyOn(fakeBcrypt, 'hash').mockImplementationOnce(() => {
        throw error;
      });

      const promise = sut.generate({ plainText });

      await expect(promise).rejects.toThrow(error);
    });

    it('Should return correct output', async () => {
      const result = await sut.generate({ plainText });

      expect(result).toEqual({ cipherText: 'hashed_value' });
    });
  });

  describe('compare', () => {
    let digest: string;

    beforeAll(() => {
      digest = 'any_digest';
      fakeBcrypt.compare.mockImplementation(() => true);
    });

    it('Should call compare with correct input', async () => {
      await sut.compare({ plainText, digest });

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plainText, digest);
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1);
    });

    it('Should rethrow if compare throws', async () => {
      const error = new Error('compare_error');
      jest.spyOn(fakeBcrypt, 'compare').mockImplementationOnce(() => {
        throw error;
      });

      const promise = sut.compare({ plainText, digest });

      await expect(promise).rejects.toThrow(error);
    });

    it('Should return correct output on success', async () => {
      const result = await sut.compare({ plainText, digest });

      expect(result).toEqual({ isValid: true });
    });
  });
});
