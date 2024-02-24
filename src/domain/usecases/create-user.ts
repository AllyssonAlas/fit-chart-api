import { LoadUserRepository } from '@/domain/contracts/repositories';
import { HashGenerator } from '@/domain/contracts/gateways';
import { EmailAlreadyExistsError } from '@/domain/errors';

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
type Setup = (loadUserRepository: LoadUserRepository, hasher: HashGenerator) => CreateUser

export const setupCreateUser: Setup = (loadUserRepository, hasher) => {
  return async (input) => {
    const user = await loadUserRepository.load({ email: input.email });
    if (user) {
      throw new EmailAlreadyExistsError();
    }
    await hasher.generate({ plainText: input.password });
  };
};
