import type { HashComparer, JwtTokenGenerator } from '@/domain/contracts/gateways';
import type { LoadRoleRepository, LoadUserRepository } from '@/domain/contracts/repositories';
import type { User } from '@/domain/entities';
import { InvalidCredentialsError, NonexistentRoleError } from '@/domain/errors';

type Input = Pick<User, 'email' | 'password'>;
type Output = { name: string; email: string; authToken: string };
export type Authentication = (input: Input) => Promise<Output>;
type Setup = (
  userRepository: LoadUserRepository,
  hasher: HashComparer,
  roleRepository: LoadRoleRepository,
  authToken: JwtTokenGenerator,
) => Authentication;

export const setupAuthentication: Setup = (userRepository, hasher, roleRepository, authToken) => {
  return async ({ email, password }) => {
    const user = await userRepository.load({ email });
    if (!user) throw new InvalidCredentialsError();
    const { isValid } = await hasher.compare({ plainText: password, digest: user.password });
    if (!isValid) throw new InvalidCredentialsError();
    const role = await roleRepository.load({ name: user.role });
    if (!role) throw new NonexistentRoleError();
    const { token } = await authToken.generate({
      id: user.id,
      permissions: role?.permissions,
      role: role?.name,
      expirationInMs: 1 * 1000 * 60 * 60,
    });
    return { name: user.name, email: user.email, authToken: token };
  };
};
