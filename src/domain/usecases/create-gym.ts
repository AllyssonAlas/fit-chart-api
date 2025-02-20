import type { LoadManyUsersRepository, LoadUserRepository } from '@/domain/contracts/repositories';
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
    complement: string | null;
  };
};
type Output = void;
export type CreateGym = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadUserRepository & LoadManyUsersRepository) => CreateGym;

export const setupCreateGym: Setup = (userRepository) => {
  return async ({ ownerEmail, administrators }) => {
    const owner = await userRepository.load({ email: ownerEmail });
    if (!owner) throw new EmailDoesNotExistError(ownerEmail);
    if (administrators) await userRepository.loadMany({ emails: administrators });
  };
};
