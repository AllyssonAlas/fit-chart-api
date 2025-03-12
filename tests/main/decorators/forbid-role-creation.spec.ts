import { type MockProxy, mock } from 'jest-mock-extended';

import type { Controller } from '@/application/controllers';
import { ForbiddenError } from '@/application/errors';
import { ok } from '@/application/helpers';
import { ForbidRoleCreationDecorator } from '@/main/decorators';

describe('ForbidRoleCreationDecorator', () => {
  const forbiddenRoles = ['any_role_1'];
  const request = {
    role: 'any_valid_role',
  };

  let sut: ForbidRoleCreationDecorator;
  let controller: MockProxy<Controller>;

  beforeAll(() => {
    controller = mock();
    controller.handle.mockResolvedValue(ok('any_data'));
  });

  beforeEach(() => {
    sut = new ForbidRoleCreationDecorator(forbiddenRoles, controller);
  });

  it('Should return 403 if request role contains a role from forbiddenRoles', async () => {
    const response = await sut.handle({ role: 'any_role_1' });

    expect(response).toEqual({
      data: new ForbiddenError(),
      statusCode: 403,
    });
  });

  it('Should call Controller with correct input', async () => {
    await sut.handle(request);

    expect(controller.handle).toHaveBeenCalledWith(request);
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });

  it('Should return same output as controller', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual({
      data: 'any_data',
      statusCode: 200,
    });
  });
});
