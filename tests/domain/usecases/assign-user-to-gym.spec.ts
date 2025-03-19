import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadGymRepository, LoadManyUsersRepository } from '@/domain/contracts/repositories';
import { GymNotFoundError } from '@/domain/errors';
import { type AssignUserToGym, setupAssignUserToGym } from '@/domain/usecases';
import { addressMock } from '@/tests/mocks/domain';

describe('AssignUserToGym', () => {
  const input = {
    gymId: 'any_gym_id',
    usersEmails: ['any_email_1@mail.com', 'any_email_2@mail.com', 'any_email_3@mail.com'],
    usersType: 'students',
  };

  let sut: AssignUserToGym;
  let gymRepository: MockProxy<LoadGymRepository>;
  let userRepository: MockProxy<LoadManyUsersRepository>;

  beforeAll(() => {
    gymRepository = mock();
    gymRepository.load.mockResolvedValue({
      name: 'any_name',
      email: 'any_email@mail.com',
      contact: 'any_contact',
      administrators: ['any_admin_email_1@mail.com', 'any_admin_email_2@mail.com'],
      address: { ...addressMock() },
    });
    userRepository = mock();
  });

  beforeEach(() => {
    sut = setupAssignUserToGym(gymRepository, userRepository);
  });

  it('Should call LoadGymRepository with correct input', async () => {
    await sut(input);

    expect(gymRepository.load).toHaveBeenCalledWith({ id: input.gymId });
    expect(gymRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadGymRepository throws', async () => {
    const error = new Error('load_gym_repository_error');
    gymRepository.load.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw GymNotFoundError if LoadGymRepository returns null', async () => {
    gymRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new GymNotFoundError());
  });

  it('Should call LoadManyUsersRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.loadMany).toHaveBeenCalledWith({ emails: input.usersEmails });
    expect(userRepository.loadMany).toHaveBeenCalledTimes(1);
  });
});
