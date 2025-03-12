import { ForbiddenError } from '@/application/errors';
import { ForbidRoleCreationDecorator } from '@/main/decorators';

describe('ForbidRoleCreationDecorator', () => {
  const forbiddenRoles = ['any_role_1'];

  let sut: ForbidRoleCreationDecorator;

  beforeEach(() => {
    sut = new ForbidRoleCreationDecorator(forbiddenRoles);
  });

  it('Should return 403 if request role contains a role from forbiddenRoles', async () => {
    const response = await sut.handle({ role: 'any_role_1' });

    expect(response).toEqual({
      data: new ForbiddenError(),
      statusCode: 403,
    });
  });
});
