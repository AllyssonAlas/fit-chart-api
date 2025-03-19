import type { LoadGymRepository, LoadManyUsersRepository } from '@/domain/contracts/repositories';
import { EmailDoesNotExistError, GymNotFoundError } from '@/domain/errors';

type Input = { gymId: string; usersType: string; usersEmails: string[] };
type Output = void;
export type AssignUserToGym = (input: Input) => Promise<Output>;
type Setup = (gymRepository: LoadGymRepository, userRepository: LoadManyUsersRepository) => AssignUserToGym;

export const setupAssignUserToGym: Setup = (gymRepository, userRepository) => {
  return async ({ gymId, usersEmails }) => {
    const gymData = await gymRepository.load({ id: gymId });
    if (!gymData) throw new GymNotFoundError();
    const usersData = await userRepository.loadMany({ emails: usersEmails });
    const nonExistentUser = usersEmails?.find((userEmail) => !usersData.find(({ email }) => userEmail === email));
    if (nonExistentUser) throw new EmailDoesNotExistError(nonExistentUser);
  };
};
