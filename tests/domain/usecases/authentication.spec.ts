import { type MockProxy, mock } from 'jest-mock-extended';

import type { HashComparer } from '@/domain/contracts/gateways';
import type { LoadRoleRepository, LoadUserRepository } from '@/domain/contracts/repositories';
import { InvalidCredentialsError, NonexistentRoleError } from '@/domain/errors';
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
  let roleRepository: MockProxy<LoadRoleRepository>;

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
    hasher.compare.mockResolvedValue({ isValid: true });
    roleRepository = mock();
    roleRepository.load.mockResolvedValue({
      id: 'any_role_id',
      name: 'any_role_name',
      permissions: ['permission_1', 'permission_2'],
    });
  });

  beforeEach(() => {
    sut = setupAuthentication(userRepository, hasher, roleRepository);
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

  it('Should rethrow if HasherComparer throws', async () => {
    const error = new Error('hasher_comparer_error');
    userRepository.load.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw InvalidCredentialsError if HasherComparer returns isValid false', async () => {
    hasher.compare.mockResolvedValueOnce({ isValid: false });

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should call LoadRoleRepository with correct input', async () => {
    await sut(input);

    expect(roleRepository.load).toHaveBeenCalledWith({ name: 'any_role' });
    expect(roleRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    const error = new Error('load_role_repository_error');
    roleRepository.load.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw an NonexistentRoleError if LoadUserRepository returns null', async () => {
    roleRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new NonexistentRoleError());
  });
});
