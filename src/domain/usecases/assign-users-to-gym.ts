import type {
  AssignUsersToGymRepository,
  LoadGymRepository,
  LoadManyUsersRepository,
} from '@/domain/contracts/repositories';
import { EmailDoesNotExistError, GymNotFoundError } from '@/domain/errors';

type Input = { gymId: string; usersType: string; usersEmails: string[] };
type Output = void;
export type AssignUsersToGym = (input: Input) => Promise<Output>;
type Setup = (
  gymRepository: LoadGymRepository & AssignUsersToGymRepository,
  userRepository: LoadManyUsersRepository,
) => AssignUsersToGym;

export const setupAssignUserToGym: Setup = (gymRepository, userRepository) => {
  return async ({ gymId, usersEmails, usersType }) => {
    const gymData = await gymRepository.load({ id: gymId });
    if (!gymData) throw new GymNotFoundError();
    const usersData = await userRepository.loadMany({ emails: usersEmails });
    const nonExistentUser = usersEmails?.find((userEmail) => !usersData.find(({ email }) => userEmail === email));
    if (nonExistentUser) throw new EmailDoesNotExistError(nonExistentUser);
    await gymRepository.assignUsers({ gymId, emails: usersEmails, usersType });
  };
};
