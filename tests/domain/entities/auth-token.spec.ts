import { AuthToken } from '@/domain/entities';

describe('AuthToken', () => {
  it('Should expire in 3600000 ms', () => {
    expect(AuthToken.expirationInMs).toBe(3600000);
  });
});
