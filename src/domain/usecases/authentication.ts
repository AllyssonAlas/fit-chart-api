import type { LoadUserRepository } from '@/domain/contracts/repositories';
import type { User } from '@/domain/entities';
import { InvalidCredentialsError } from '@/domain/errors';

type Input = Pick<User, 'email' | 'password'>;
type Output = void;
export type Authentication = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadUserRepository) => Authentication;

export const setupAuthentication: Setup = (userRepository) => {
  return async ({ email }) => {
    const user = await userRepository.load({ email });
    if (!user) throw new InvalidCredentialsError();
  };
};
