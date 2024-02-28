import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  it('Should call hash with correct input', async () => {
    const salt = 1;
    const fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
    const sut = new BcryptAdapter(salt);

    await sut.generate({ plainText: 'any_value' });

    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt);
    expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1);
  });
});
