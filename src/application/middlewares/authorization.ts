import { ForbiddenError, UnauthorizedError } from '@/application/errors';
import { type HttpResponse, forbidden, unauthorized } from '@/application/helpers';
import type { Authorization } from '@/domain/usecases';

type HttpRequest = {
  authorization: string;
};

export class AuthorizationMiddleware {
  constructor(
    private readonly authorize: Authorization,
    private readonly requiredPermission: string,
  ) {}

  async handle({ authorization: authToken }: HttpRequest): Promise<HttpResponse<Error> | void> {
    try {
      if (!authToken) return unauthorized(new UnauthorizedError());
      await this.authorize({ authToken, requiredPermission: this.requiredPermission });
    } catch (error) {
      return forbidden(new ForbiddenError());
    }
  }
}
