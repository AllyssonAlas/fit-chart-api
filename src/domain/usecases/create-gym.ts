import type { LoadManyUsersRepository, SaveGymRepository } from '@/domain/contracts/repositories';
import { Gym, type GymData } from '@/domain/entities';
import { EmailDoesNotExistError } from '@/domain/errors';

type Input = GymData;
type Output = void;
export type CreateGym = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadManyUsersRepository, gymRepository: SaveGymRepository) => CreateGym;

export const setupCreateGym: Setup = (userRepository, gymRepository) => {
  return async ({ administrators, ...input }) => {
    const gymData = new Gym(input);
    if (administrators?.length) {
      const administratorsData = await userRepository.loadMany({ emails: administrators });
      gymData.administrators = administratorsData.map(({ email }) => email);
      const nonExistentUser = gymData.finNonExistentUser(administrators);
      if (nonExistentUser) throw new EmailDoesNotExistError(nonExistentUser);
    }
    await gymRepository.save(gymData);
  };
};
