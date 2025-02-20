import type { LoadUserRepository } from '@/domain/contracts/repositories';

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
type Setup = (userRepository: LoadUserRepository) => CreateGym;

export const setupCreateGym: Setup = (userRepository) => {
  return async ({ ownerEmail }) => {
    await userRepository.load({ email: ownerEmail });
  };
};
