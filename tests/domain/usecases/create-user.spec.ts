import { mock, MockProxy } from 'jest-mock-extended';

import { CreateUser, setupCreateUser } from '@/domain/usecases';
import { EmailAlreadyExistsError } from '@/domain/errors';
import { LoadUserRepository } from '@/domain/contracts/repositories';

describe('CreateUser', () => {
  const user = {
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
  };

  let loadUserRepository: MockProxy<LoadUserRepository>;
  let sut: MockProxy<CreateUser>;

  beforeEach(() => {
    loadUserRepository = mock();
    sut = setupCreateUser(loadUserRepository);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(user);

    expect(loadUserRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' });
    expect(loadUserRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw an EmailAlreadyExistsError if LoadUserRepository returns an user', async () => {
    loadUserRepository.load.mockResolvedValue({ ...user, id: 'any_id' });

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError());
  });

  it('should rethrow if LoadUserRepository throws', async () => {
    loadUserRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });
});
