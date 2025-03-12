import type { Controller } from '@/application/controllers';
import { ForbiddenError } from '@/application/errors';
import { forbidden } from '@/application/helpers';

export class ForbidRoleCreationDecorator {
  constructor(
    private readonly forbiddenRoles: string[],
    private readonly controller: Controller,
  ) {}

  async handle(request: any): Promise<any> {
    if (this.forbiddenRoles.includes(request.role)) {
      return forbidden(new ForbiddenError());
    }
    this.controller.handle(request);
  }
}
