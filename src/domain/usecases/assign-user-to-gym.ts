import type { LoadGymRepository } from '@/domain/contracts/repositories';

type Input = { gymId: string; usersType: string; usersEmails: string[] };
type Output = void;
export type AssignUserToGym = (input: Input) => Promise<Output>;
type Setup = (gymRepository: LoadGymRepository) => AssignUserToGym;

export const setupAssignUserToGym: Setup = (gymRepository) => {
  return async ({ gymId }) => {
    await gymRepository.load({ id: gymId });
  };
};
