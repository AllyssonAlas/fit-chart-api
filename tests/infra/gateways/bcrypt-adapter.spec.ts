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
      jest.spyOn(fakeBcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error('bcrypt_error');
      });

      const promise = sut.generate({ plainText });

      await expect(promise).rejects.toThrow(new Error('bcrypt_error'));
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
    });

    it('Should call compare with correct input', async () => {
      await sut.compare({ plainText, digest });

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plainText, digest);
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1);
    });
  });
});
