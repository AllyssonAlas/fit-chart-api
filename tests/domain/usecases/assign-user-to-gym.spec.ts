import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadGymRepository, LoadManyUsersRepository } from '@/domain/contracts/repositories';
import { EmailDoesNotExistError, GymNotFoundError } from '@/domain/errors';
import { type AssignUserToGym, setupAssignUserToGym } from '@/domain/usecases';
import { addressMock, userMock } from '@/tests/mocks/domain';

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
    userRepository.loadMany.mockResolvedValue([
      { ...userMock(), email: 'any_email_1@mail.com' },
      { ...userMock(), email: 'any_email_2@mail.com' },
      { ...userMock(), email: 'any_email_3@mail.com' },
    ]);
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

  it('Should rethrow if LoadManyUsersRepository throws', async () => {
    const error = new Error('load_many_users_repository_error');
    userRepository.loadMany.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw EmailDoesNotExistError if LoadManyUsersRepository does not return all usersEmails', async () => {
    userRepository.loadMany.mockResolvedValueOnce([
      { ...userMock(), email: 'any_email_1@mail.com' },
      { ...userMock(), email: 'any_email_3@mail.com' },
    ]);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new EmailDoesNotExistError(input.usersEmails[1]));
  });
});
