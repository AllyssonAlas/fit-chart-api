import type { LoadManyUsersRepository, LoadUserRepository, SaveGymRepository } from '@/domain/contracts/repositories';
import { EmailDoesNotExistError } from '@/domain/errors';

type Input = {
  name: string;
  email?: string;
  contact: string;
  ownerEmail: string;
  administrators?: string[];
  address: {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement?: string;
  };
};
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
    await gymRepository.save({ ownerEmail, administrators, ...input });
  };
};
