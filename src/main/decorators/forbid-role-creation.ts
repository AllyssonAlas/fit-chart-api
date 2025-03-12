import type { Controller } from '@/application/controllers';
import { ForbiddenError } from '@/application/errors';
import { type HttpResponse, forbidden } from '@/application/helpers';

export class ForbidRoleCreationDecorator {
  constructor(
    private readonly forbiddenRoles: string[],
    private readonly controller: Controller,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    if (this.forbiddenRoles.includes(request.role)) {
      return forbidden(new ForbiddenError());
    }
    const response = await this.controller.handle(request);
    return response;
  }
}
