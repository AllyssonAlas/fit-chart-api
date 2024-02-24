import { mock, MockProxy } from 'jest-mock-extended';

import { CreateUser, setupCreateUser } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';
import { HashGenerator } from '@/domain/contracts/gateways';
import { EmailAlreadyExistsError } from '@/domain/errors';

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

  let sut: MockProxy<CreateUser>;
  let loadUserRepository: MockProxy<LoadUserRepository>;
  let hashGenerator: MockProxy<HashGenerator>;

  beforeEach(() => {
    hashGenerator = mock();
    loadUserRepository = mock();
    sut = setupCreateUser(loadUserRepository, hashGenerator);
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

  it('Should rethrow if LoadUserRepository throws', async () => {
    loadUserRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });

  it('Should call HashGenerator with correct input', async () => {
    await sut(user);

    expect(hashGenerator.generate).toHaveBeenCalledWith({ plainText: 'any_password' });
    expect(hashGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if HashGenerator throws', async () => {
    hashGenerator.generate.mockRejectedValueOnce(new Error('hahser_generator_error'));

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new Error('hahser_generator_error'));
  });
});
