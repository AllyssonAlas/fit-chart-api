import { LoadUserRepository, SaveUserRepository, LoadRoleRepository } from '@/domain/contracts/repositories';
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
type Setup = (userRepository: LoadUserRepository & SaveUserRepository, roleRepository: LoadRoleRepository, hasher: HashGenerator) => CreateUser

export const setupCreateUser: Setup = (userRepository, roleRepository, hasher) => {
  return async (input) => {
    const user = await userRepository.load({ email: input.email });
    if (user) {
      throw new EmailAlreadyExistsError();
    }
    await roleRepository.load({ name: input.role });
    const { cipherText } = await hasher.generate({ plainText: input.password });
    await userRepository.save({ ...input, password: cipherText });
  };
};
