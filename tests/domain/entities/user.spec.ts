import { User } from '@/domain/entities';

describe('User', () => {
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
      complement: null,
    },
  };

  it('Should return an user', () => {
    const sut = new User(userData);

    expect(sut).toEqual(userData);
  });

  it('Should return an user with address complement', () => {
    const addressWithComplement = { ...userData.address, complement: 'any_complement' };

    const sut = new User({ ...userData, address: addressWithComplement });

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
        complement: 'any_complement',
      },
    });
  });
});
