import { AssignUserToGymController, Controller } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import { RequiredArray, RequiredParam, RequiredString, RequiredStringArray } from '@/application/validation';

jest.mock('@/application/validation/composite');

describe('AssignUserToGymController', () => {
  const request = {
    gymId: 'any_gym_id',
    usersEmails: ['any_email_1@mail.com', 'any_email_2@mail.com', 'any_email_3@mail.com'],
    usersType: 'students',
  };

  let sut: AssignUserToGymController;
  let assignUserToGym: jest.Mock;

  beforeAll(() => {
    assignUserToGym = jest.fn();
  });

  beforeEach(() => {
    sut = new AssignUserToGymController(assignUserToGym);
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredParam(request, 'gymId'),
      new RequiredString(request.gymId, 'gymId'),
      new RequiredParam(request, 'usersEmails'),
      new RequiredArray(request.usersEmails, 'usersEmails'),
      new RequiredStringArray(request.usersEmails, 'usersEmails'),
      new RequiredParam(request, 'usersType'),
      new RequiredString(request.usersType, 'usersType'),
    ]);
  });

  it('Should call AssignUserToGym with correct input', async () => {
    await sut.handle(request);

    expect(assignUserToGym).toHaveBeenCalledWith(request);
    expect(assignUserToGym).toHaveBeenCalledTimes(1);
  });

  it('Should return 500 if AssignUserToGym throws infra error', async () => {
    const error = new Error('infra_error');
    assignUserToGym.mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new ServerError(error),
      statusCode: 500,
    });
  });
});
