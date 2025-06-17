import { type MockProxy, mock } from 'jest-mock-extended';

import type { HashGenerator } from '@/domain/contracts/gateways';
import type { CreateUserRepository, LoadRoleRepository, LoadUserRepository } from '@/domain/contracts/repositories';
import { User } from '@/domain/entities';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { type CreateUser, setupCreateUser } from '@/domain/usecases';

import { addressMock, userMock } from '@/tests/mocks/domain';

jest.mock('@/domain/entities/user');

describe('CreateUser', () => {
  const input = {
    ...userMock(),
    password: 'any_password',
    address: { ...addressMock() },
  };

  let sut: MockProxy<CreateUser>;
  let userRepository: MockProxy<LoadUserRepository & CreateUserRepository>;
  let roleRepository: MockProxy<LoadRoleRepository>;
  let hashGenerator: MockProxy<HashGenerator>;

  beforeAll(() => {
    hashGenerator = mock();
    roleRepository = mock();
    userRepository = mock();
    userRepository.load.mockResolvedValue(null);
    roleRepository.load.mockResolvedValue({
      id: 'any_role_id',
      name: 'any_role',
      permissions: ['permission_1', 'permission_2'],
    });
    hashGenerator.generate.mockResolvedValue({ cipherText: 'hashed_text' });
  });

  beforeEach(() => {
    sut = setupCreateUser(userRepository, roleRepository, hashGenerator);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: input.email });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw an EmailAlreadyExistsError if LoadUserRepository returns an user', async () => {
    userRepository.load.mockResolvedValueOnce({ ...input, id: 'any_id' });

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError());
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    userRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });

  it('Should call LoadRoleRepository with correct input', async () => {
    await sut(input);

    expect(roleRepository.load).toHaveBeenCalledWith({ name: input.role });
    expect(roleRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw an NonexistentRoleError if LoadUserRepository returns null', async () => {
    roleRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new NonexistentRoleError());
  });

  it('Should rethrow if LoadRoleRepository throws', async () => {
    roleRepository.load.mockRejectedValueOnce(new Error('load_role_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_role_repository_error'));
  });

  it('Should call HashGenerator with correct input', async () => {
    await sut(input);

    expect(hashGenerator.generate).toHaveBeenCalledWith({ plainText: input.password });
    expect(hashGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if HashGenerator throws', async () => {
    hashGenerator.generate.mockRejectedValueOnce(new Error('hahser_generator_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('hahser_generator_error'));
  });

  it('Should call CreateUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.create).toHaveBeenCalledWith(jest.mocked(User).mock.instances[0]);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if CreateUserRepository throws', async () => {
    userRepository.create.mockRejectedValueOnce(new Error('create_user_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('create_user_repository_error'));
  });
});
