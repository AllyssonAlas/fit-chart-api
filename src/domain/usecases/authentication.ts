import type { LoadUserRepository } from '@/domain/contracts/repositories';
import type { User } from '@/domain/entities';

type Input = Pick<User, 'email' | 'password'>;
type Output = void;
export type Authentication = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadUserRepository) => Authentication;

export const setupAuthentication: Setup = (userRepository) => {
  return async ({ email }) => {
    await userRepository.load({ email });
  };
};
