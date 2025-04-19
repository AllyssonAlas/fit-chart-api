import { Gym } from '@/domain/entities';

describe('Gym', () => {
  const gymData = {
    name: 'any_name',
    email: 'any_email@mail.com',
    contact: 'any_contact',
    administrators: ['any_admin_email_1@mail.com', 'any_admin_email_2@mail.com'],
    clients: ['any_client_email_1@mail.com', 'any_client_email_2@mail.com'],
    instructors: ['any_instructor_email_1@mail.com', 'any_instructor_email_2@mail.com'],
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

  it('Should return a Gym without administrators', () => {
    const { administrators, ...data } = gymData;

    const sut = new Gym(data);

    expect(sut).toEqual(data);
  });

  it('Should return a Gym without email', () => {
    const { email, ...data } = gymData;

    const sut = new Gym(data);

    expect(sut).toEqual(data);
  });

  describe('finNonExistentUser', () => {
    it('Should return a non existent email', () => {
      const usersFound = ['any_admin_email_1@mail.com'];

      const sut = new Gym(gymData).finNonExistentUser(usersFound);

      expect(sut).toBe(gymData.administrators[1]);
    });

    it('Should return a non existent email', () => {
      const usersFound = ['any_admin_email_1@mail.com', 'any_admin_email_2@mail.com'];

      const sut = new Gym(gymData).finNonExistentUser(usersFound);

      expect(sut).toBeUndefined();
    });
  });
});
