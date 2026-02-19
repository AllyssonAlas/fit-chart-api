import type { HashGenerator } from '@/domain/contracts/gateways';
import type {
  CreateUserRepository,
  LoadRoleRepository,
  LoadUserByEmailRepository,
} from '@/domain/contracts/repositories';
import { User } from '@/domain/entities';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';

type Input = User;
type Output = void;
export type CreateUser = (input: Input) => Promise<Output>;
type Setup = (
  userRepository: LoadUserByEmailRepository & CreateUserRepository,
  roleRepository: LoadRoleRepository,
  hasher: HashGenerator,
) => CreateUser;

export const setupCreateUser: Setup = (userRepository, roleRepository, hasher) => {
  return async (input) => {
    const user = await userRepository.loadByEmail({ email: input.email });
    if (user) {
      throw new EmailAlreadyExistsError();
    }
    const role = await roleRepository.load({ name: input.role });
    if (!role) {
      throw new NonexistentRoleError();
    }
    const { cipherText } = await hasher.generate({ plainText: input.password });
    const newUserData = new User({ ...input, password: cipherText });
    await userRepository.create(newUserData);
  };
};
