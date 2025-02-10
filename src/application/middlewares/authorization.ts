import { ForbiddenError, UnauthorizedError } from '@/application/errors';
import { type HttpResponse, forbidden, ok, unauthorized } from '@/application/helpers';
import type { Authorization } from '@/domain/usecases';

type HttpRequest = {
  authorization: string;
};

type Model = { userId: string } | Error;

export class AuthorizationMiddleware {
  constructor(
    private readonly authorize: Authorization,
    private readonly requiredPermission: string,
  ) {}

  async handle({ authorization: authToken }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!authToken) return unauthorized(new UnauthorizedError());
      const result = await this.authorize({ authToken, requiredPermission: this.requiredPermission });
      return ok(result);
    } catch (error) {
      return forbidden(new ForbiddenError());
    }
  }
}
