import { User } from '@/domain/entities';

describe('User', () => {
  it('Should return an user', () => {
    const userData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'any_role_name',
      contact: 'any_contact',
      address: {
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        number: 'any_number',
        postalCode: 'any_postal_code',
        state: 'any_state',
        street: 'any_street',
      },
    };

    const sut = new User(userData);

    expect(sut).toEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'any_role_name',
      contact: 'any_contact',
      address: {
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        number: 'any_number',
        postalCode: 'any_postal_code',
        state: 'any_state',
        street: 'any_street',
      },
    });
  });
});
