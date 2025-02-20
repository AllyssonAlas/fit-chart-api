import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadUserRepository } from '@/domain/contracts/repositories';
import { type CreateGym, setupCreateGym } from '@/domain/usecases';

describe('CreateGym', () => {
  const input = {
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

  let sut: CreateGym;
  let userRepository: MockProxy<LoadUserRepository>;

  beforeAll(() => {
    userRepository = mock();
  });

  beforeEach(() => {
    sut = setupCreateGym(userRepository);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: input.ownerEmail });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    const error = new Error('load_user_repository_error');
    userRepository.load.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });
});
