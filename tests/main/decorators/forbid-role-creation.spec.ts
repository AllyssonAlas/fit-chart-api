import { type MockProxy, mock } from 'jest-mock-extended';

import type { Controller } from '@/application/controllers';
import { ForbiddenError } from '@/application/errors';
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
});
