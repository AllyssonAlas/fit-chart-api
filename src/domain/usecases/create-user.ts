import type { HashGenerator } from '@/domain/contracts/gateways';
import type { LoadRoleRepository, LoadUserRepository, SaveUserRepository } from '@/domain/contracts/repositories';
import { User } from '@/domain/entities';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';

type Input = User;
type Output = void;
export type CreateUser = (input: Input) => Promise<Output>;
type Setup = (
  userRepository: LoadUserRepository & SaveUserRepository,
  roleRepository: LoadRoleRepository,
  hasher: HashGenerator,
) => CreateUser;

export const setupCreateUser: Setup = (userRepository, roleRepository, hasher) => {
  return async (input) => {
    const user = await userRepository.load({ email: input.email });
    if (user) {
      throw new EmailAlreadyExistsError();
    }
    const role = await roleRepository.load({ name: input.role });
    if (!role) {
      throw new NonexistentRoleError();
    }
    const { cipherText } = await hasher.generate({ plainText: input.password });
    const newUserData = new User({ ...input, password: cipherText });
    await userRepository.save(newUserData);
  };
};
