import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadManyUsersRepository, LoadUserRepository, SaveGymRepository } from '@/domain/contracts/repositories';
import { EmailDoesNotExistError } from '@/domain/errors';
import { type CreateGym, setupCreateGym } from '@/domain/usecases';

describe('CreateGym', () => {
  const input = {
    name: 'any_name',
    email: 'any_email@mail.com',
    contact: 'any_contact',
    ownerEmail: 'any_owner_email@mail.com',
    administrators: ['any_admin_email_1@mail.com', 'any_admin_email_2@mail.com'],
    address: {
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      postalCode: 'any_postal_code',
      state: 'any_state',
      street: 'any_street',
      complement: 'any_complement',
    },
  };

  let sut: CreateGym;
  let userRepository: MockProxy<LoadUserRepository & LoadManyUsersRepository>;
  let gymRepository: MockProxy<SaveGymRepository>;

  beforeAll(() => {
    userRepository = mock();
    userRepository.load.mockResolvedValue({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_owner_email@mail.com',
      password: 'any_hashed_password',
      contact: 'any_contact',
      role: 'any_role',
    });
    userRepository.loadMany.mockResolvedValue([
      {
        id: 'any_user_id',
        name: 'any_user_name',
        email: 'any_admin_email_1@mail.com',
        password: 'any_hashed_password',
        contact: 'any_contact',
        role: 'any_role',
      },

      {
        id: 'any_user_id',
        name: 'any_user_name',
        email: 'any_admin_email_2@mail.com',
        password: 'any_hashed_password',
        contact: 'any_contact',
        role: 'any_role',
      },
    ]);
    gymRepository = mock();
  });

  beforeEach(() => {
    sut = setupCreateGym(userRepository, gymRepository);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: input.ownerEmail });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    const error = new Error('load_user_repository_error');
    userRepository.load.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw EmailDoesNotExistError if LoadUserRepository returns null', async () => {
    userRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new EmailDoesNotExistError(input.ownerEmail));
  });

  it('Should call LoadManyUsersRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.loadMany).toHaveBeenCalledWith({ emails: input.administrators });
    expect(userRepository.loadMany).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadManyUsersRepository throws', async () => {
    const error = new Error('load_many_users_repository_error');
    userRepository.loadMany.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should throw EmailDoesNotExistError if LoadManyUsersRepository does not return all administrators', async () => {
    userRepository.loadMany.mockResolvedValueOnce([
      {
        id: 'any_user_id',
        name: 'any_user_name',
        email: 'any_admin_email_1@mail.com',
        password: 'any_hashed_password',
        contact: 'any_contact',
        role: 'any_role',
      },
    ]);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new EmailDoesNotExistError(input.administrators[1]));
  });

  it('Should not call LoadManyUsersRepository if administrators are not received', async () => {
    const { administrators, ...inputData } = input;

    await sut(inputData);

    expect(userRepository.loadMany).not.toHaveBeenCalled();
    expect(userRepository.loadMany).toHaveBeenCalledTimes(0);
  });

  it('Should call SaveGymRepository with correct input', async () => {
    await sut(input);

    expect(gymRepository.save).toHaveBeenCalledWith(input);
    expect(gymRepository.save).toHaveBeenCalledTimes(1);
  });
});
