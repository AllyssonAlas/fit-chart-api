import { Controller } from '@/application/controllers';
import { ForbiddenError } from '@/application/errors';
import { type HttpResponse, forbidden } from '@/application/helpers';

export class ForbidRoleCreationDecorator extends Controller {
  constructor(
    private readonly forbiddenRoles: string[],
    private readonly controller: Controller,
  ) {
    super();
  }

  async perform(request: any): Promise<HttpResponse> {
    if (this.forbiddenRoles.includes(request.role)) {
      return forbidden(new ForbiddenError());
    }
    const response = await this.controller.handle(request);
    return response;
  }
}
