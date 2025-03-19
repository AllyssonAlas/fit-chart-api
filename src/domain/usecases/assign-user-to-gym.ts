import type { LoadGymRepository, LoadManyUsersRepository } from '@/domain/contracts/repositories';
import { GymNotFoundError } from '@/domain/errors';

type Input = { gymId: string; usersType: string; usersEmails: string[] };
type Output = void;
export type AssignUserToGym = (input: Input) => Promise<Output>;
type Setup = (gymRepository: LoadGymRepository, userRepository: LoadManyUsersRepository) => AssignUserToGym;

export const setupAssignUserToGym: Setup = (gymRepository, userRepository) => {
  return async ({ gymId, usersEmails }) => {
    const gymData = await gymRepository.load({ id: gymId });
    if (!gymData) throw new GymNotFoundError();
    await userRepository.loadMany({ emails: usersEmails });
  };
};
