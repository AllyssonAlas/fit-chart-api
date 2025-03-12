import { ForbiddenError } from '@/application/errors';
import { forbidden } from '@/application/helpers';

export class ForbidRoleCreationDecorator {
  constructor(private readonly forbiddenRoles: string[]) {}

  async handle(request: any): Promise<any> {
    return forbidden(new ForbiddenError());
  }
}
