import jsonwebtoken from 'jsonwebtoken';

import type { JwtTokenGenerator } from '@/domain/contracts/gateways';
import { JwtAdapter } from '@/infra/gateways';

jest.mock('jsonwebtoken');

describe('JwtAdapter,', () => {
  let sut: JwtAdapter;
  let fakeJwt: jest.Mocked<typeof jsonwebtoken>;
  let input: Omit<JwtTokenGenerator.Input, 'expirationInMs'>;
  let secret: string;
  let expirationInMs: number;

  beforeAll(() => {
    fakeJwt = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>;
    secret = 'any_secret';
    input = {
      id: 'any_user_id',
      role: 'any_role',
      permissions: ['any_permission'],
    };
    expirationInMs = 10000;
  });

  beforeEach(() => {
    sut = new JwtAdapter(secret);
  });

  it('Should call jsonwebtoken sign with correct input', async () => {
    await sut.generate({ ...input, expirationInMs });

    expect(fakeJwt.sign).toHaveBeenCalledWith(input, secret, { expiresIn: expirationInMs });
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1);
  });
});
