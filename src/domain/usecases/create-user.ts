import { LoadUserRepository } from '@/domain/contracts/repositories';

type Input = {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  address: {
    number: string
    street: string
    neighborhood: string
    city: string
    state: string
    postalCode: string
    complement?: string
  };
};
type Output = void
export type CreateUser = (input: Input) => Promise<Output>
type Setup = (loadUserRepository: LoadUserRepository) => CreateUser

export const setupCreateUser: Setup = (loadUserRepository) => {
  return async (input) => {
    await loadUserRepository.load({ email: input.email });
  };
};
