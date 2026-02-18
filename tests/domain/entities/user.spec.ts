import { User } from '@/domain/entities';

describe('User', () => {
  const userData = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    role: 'any_role_name',
    contact: 'any_contact',
    activeChartId: 'any_exercises_chart_id',
    address: {
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      postalCode: 'any_postal_code',
      state: 'any_state',
      street: 'any_street',
    },
  };

  it('Should return an user', () => {
    const sut = new User(userData);

    expect(sut).toEqual(userData);
  });

  it('Should return an user without id', () => {
    const { id, ...data } = userData;

    const sut = new User(data);

    expect(sut).toEqual(data);
  });

  it('Should return an user with address complement', () => {
    const { activeChartId, ...user } = userData;

    const sut = new User(user);

    expect(sut).toEqual(user);
  });

  it('Should return an user with address complement', () => {
    const addressWithComplement = { ...userData.address, complement: 'any_complement' };
    const data = { ...userData, address: addressWithComplement };

    const sut = new User(data);

    expect(sut).toEqual(data);
  });
});
