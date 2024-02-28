import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  let plainText: string;
  let salt: number;

  let sut : BcryptAdapter;
  let fakeBcrypt: jest.Mocked<typeof bcrypt>;

  beforeAll(() => {
    plainText = 'any_value';
    salt = 1;
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
  });

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

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
});
