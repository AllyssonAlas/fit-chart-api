import { Gym } from '@/domain/entities';

describe('Gym', () => {
  const gymData = {
    name: 'any_name',
    email: 'any_email@mail.com',
    contact: 'any_contact',
    ownerEmail: 'any_owner_email@mail.com',
    administrators: ['any_admin_email_1@mail.com', 'any_admin_email_2@mail.com'],
    address: {
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      postalCode: 'any_postal_code',
      state: 'any_state',
      street: 'any_street',
      complement: 'any_complement',
    },
  };

  it('Should return a Gym', () => {
    const sut = new Gym(gymData);

    expect(sut).toEqual(gymData);
  });
});
