import { type MockProxy, mock } from 'jest-mock-extended';

import type { HashGenerator } from '@/domain/contracts/gateways';
import type { LoadRoleRepository, LoadUserRepository, SaveUserRepository } from '@/domain/contracts/repositories';
import { User } from '@/domain/entities';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { type CreateUser, setupCreateUser } from '@/domain/usecases';

import { addressMock, userMock } from '@/tests/mocks/domain';

jest.mock('@/domain/entities/user');

describe('CreateUser', () => {
  const user = {
    ...userMock(),
    password: 'any_password',
    address: { ...addressMock() },
  };

  let sut: MockProxy<CreateUser>;
  let userRepository: MockProxy<LoadUserRepository & SaveUserRepository>;
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
    await sut(user);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw an EmailAlreadyExistsError if LoadUserRepository returns an user', async () => {
    userRepository.load.mockResolvedValueOnce({ ...user, id: 'any_id' });

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError());
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    userRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });

  it('Should call LoadRoleRepository with correct input', async () => {
    await sut(user);

    expect(roleRepository.load).toHaveBeenCalledWith({ name: user.role });
    expect(roleRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw an NonexistentRoleError if LoadUserRepository returns null', async () => {
    roleRepository.load.mockResolvedValueOnce(null);

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new NonexistentRoleError());
  });

  it('Should rethrow if LoadRoleRepository throws', async () => {
    roleRepository.load.mockRejectedValueOnce(new Error('load_role_repository_error'));

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new Error('load_role_repository_error'));
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

    expect(userRepository.save).toHaveBeenCalledWith(jest.mocked(User).mock.instances[0]);
    expect(userRepository.save).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if SaveUserRepository throws', async () => {
    userRepository.save.mockRejectedValueOnce(new Error('save_user_repository_error'));

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new Error('save_user_repository_error'));
  });
});
