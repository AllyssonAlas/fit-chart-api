import { mock } from 'jest-mock-extended';

import { setupCreateUser } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';

describe('CreateUser', () => {
  it('Should call LoadUserRepository with correct input', async () => {
    const loadUserRepository = mock<LoadUserRepository>();
    const sut = setupCreateUser(loadUserRepository);

    await sut({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'any_role_id',
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

    expect(loadUserRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' });
    expect(loadUserRepository.load).toHaveBeenCalledTimes(1);
  });
});
