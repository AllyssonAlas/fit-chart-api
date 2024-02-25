import { mock, MockProxy } from 'jest-mock-extended';

import { CreateUser, setupCreateUser } from '@/domain/usecases';
import { LoadUserRepository, SaveUserRepository } from '@/domain/contracts/repositories';
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
  let userRepository: MockProxy<LoadUserRepository & SaveUserRepository>;
  let hashGenerator: MockProxy<HashGenerator>;

  beforeEach(() => {
    hashGenerator = mock();
    userRepository = mock();
    userRepository.load.mockResolvedValue(undefined);
    hashGenerator.generate.mockResolvedValue({ cipherText: 'hashed_text' });
    sut = setupCreateUser(userRepository, hashGenerator);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(user);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw an EmailAlreadyExistsError if LoadUserRepository returns an user', async () => {
    userRepository.load.mockResolvedValue({ ...user, id: 'any_id' });

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError());
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    userRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

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

  it('Should call SaveUserRepository with correct input', async () => {
    await sut(user);

    expect(userRepository.save).toHaveBeenCalledWith({ ...user, password: 'hashed_text' });
    expect(userRepository.save).toHaveBeenCalledTimes(1);
  });
});
