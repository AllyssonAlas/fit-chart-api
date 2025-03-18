import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadGymRepository } from '@/domain/contracts/repositories';
import { type AssignUserToGym, setupAssignUserToGym } from '@/domain/usecases';

describe('AssignUserToGym', () => {
  const input = {
    gymId: 'any_gym_id',
    usersEmails: ['any_email_1@mail.com', 'any_email_2@mail.com', 'any_email_3@mail.com'],
    usersType: 'students',
  };

  let sut: AssignUserToGym;
  let gymRepository: MockProxy<LoadGymRepository>;

  beforeAll(() => {
    gymRepository = mock();
  });

  beforeEach(() => {
    sut = setupAssignUserToGym(gymRepository);
  });

  it('Should call LoadGymRepository with correct input', async () => {
    await sut(input);

    expect(gymRepository.load).toHaveBeenCalledWith({ id: input.gymId });
    expect(gymRepository.load).toHaveBeenCalledTimes(1);
  });
});
