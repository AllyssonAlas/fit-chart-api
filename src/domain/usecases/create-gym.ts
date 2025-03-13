import type { LoadManyUsersRepository, LoadUserRepository, SaveGymRepository } from '@/domain/contracts/repositories';
import { Gym, type GymData } from '@/domain/entities';
import { EmailDoesNotExistError } from '@/domain/errors';

type Input = GymData;
type Output = void;
export type CreateGym = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadManyUsersRepository, gymRepository: SaveGymRepository) => CreateGym;

export const setupCreateGym: Setup = (userRepository, gymRepository) => {
  return async ({ administrators, ...input }) => {
    const gymData = new Gym({ administrators, ...input });
    if (administrators) {
      const administratorsData = await userRepository.loadMany({ emails: administrators });
      const nonExistentUser = gymData.finNonExistentUser(administratorsData);
      if (nonExistentUser) throw new EmailDoesNotExistError(nonExistentUser);
    }
    await gymRepository.save(gymData);
  };
};
