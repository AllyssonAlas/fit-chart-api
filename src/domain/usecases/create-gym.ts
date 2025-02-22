import type { LoadManyUsersRepository, LoadUserRepository, SaveGymRepository } from '@/domain/contracts/repositories';
import { Gym, type GymData } from '@/domain/entities';
import { EmailDoesNotExistError } from '@/domain/errors';

type Input = GymData;
type Output = void;
export type CreateGym = (input: Input) => Promise<Output>;
type Setup = (
  userRepository: LoadUserRepository & LoadManyUsersRepository,
  gymRepository: SaveGymRepository,
) => CreateGym;

export const setupCreateGym: Setup = (userRepository, gymRepository) => {
  return async ({ ownerEmail, administrators, ...input }) => {
    const owner = await userRepository.load({ email: ownerEmail });
    if (!owner) throw new EmailDoesNotExistError(ownerEmail);
    if (administrators) {
      const administratorsData = await userRepository.loadMany({ emails: administrators });
      const findNonExistentAdministrator = administrators.find(
        (admEmail) => !administratorsData.find(({ email }) => email === admEmail),
      );
      if (findNonExistentAdministrator) throw new EmailDoesNotExistError(findNonExistentAdministrator);
    }
    const gymData = new Gym({ ownerEmail, administrators, ...input });
    await gymRepository.save(gymData);
  };
};
