import { AuthedUser } from '@/domain/entities';

describe('AuthedUser', () => {
  const authedUserData = {
    name: 'any_name',
    email: 'any_email@mail.com',
    authToken: 'any_auth_token',
  };

  it('Should return an authed user', () => {
    const sut = new AuthedUser(authedUserData);

    expect(sut).toEqual(authedUserData);
  });
});
