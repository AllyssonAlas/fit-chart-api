import { type MockProxy, mock } from 'jest-mock-extended';

import type { HashComparer } from '@/domain/contracts/gateways';
import type { LoadUserRepository } from '@/domain/contracts/repositories';
import { InvalidCredentialsError } from '@/domain/errors';
import { type Authentication, setupAuthentication } from '@/domain/usecases';

jest.mock('@/domain/entities/user');

describe('Authentication', () => {
  const input = {
    email: 'any_email@mail.com',
    password: 'any_password',
  };

  let sut: MockProxy<Authentication>;
  let userRepository: MockProxy<LoadUserRepository>;
  let hasher: MockProxy<HashComparer>;

  beforeAll(() => {
    userRepository = mock();
    userRepository.load.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_hashed_password',
      contact: 'any_contact',
      role: 'any_role',
    });
    hasher = mock();
  });

  beforeEach(() => {
    sut = setupAuthentication(userRepository, hasher);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    const error = new Error('load_user_repository_error');
    userRepository.load.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw InvalidCredentialsError if LoadUserRepository returns null', async () => {
    userRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should call HasherComparer with correct input', async () => {
    await sut(input);

    expect(hasher.compare).toHaveBeenCalledWith({ plainText: 'any_password', digest: 'any_hashed_password' });
    expect(hasher.compare).toHaveBeenCalledTimes(1);
  });
});
