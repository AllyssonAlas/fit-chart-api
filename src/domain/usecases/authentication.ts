import type { HashComparer } from '@/domain/contracts/gateways';
import type { LoadUserRepository } from '@/domain/contracts/repositories';
import type { User } from '@/domain/entities';
import { InvalidCredentialsError } from '@/domain/errors';

type Input = Pick<User, 'email' | 'password'>;
type Output = void;
export type Authentication = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadUserRepository, hasher: HashComparer) => Authentication;

export const setupAuthentication: Setup = (userRepository, hasher) => {
  return async ({ email, password }) => {
    const user = await userRepository.load({ email });
    if (!user) throw new InvalidCredentialsError();
    await hasher.compare({ plainText: password, digest: user.password });
  };
};
