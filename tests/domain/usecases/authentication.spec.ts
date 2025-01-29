import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadUserRepository } from '@/domain/contracts/repositories';
import { type Authentication, setupAuthentication } from '@/domain/usecases';

jest.mock('@/domain/entities/user');

describe('Authentication', () => {
  const input = {
    email: 'any_email@mail.com',
    password: 'any_password',
  };

  let sut: MockProxy<Authentication>;
  let userRepository: MockProxy<LoadUserRepository>;

  beforeAll(() => {
    userRepository = mock();
  });

  beforeEach(() => {
    sut = setupAuthentication(userRepository);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });
});
