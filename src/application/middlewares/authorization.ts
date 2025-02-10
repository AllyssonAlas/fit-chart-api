import { UnauthorizedError } from '@/application/errors';
import { type HttpResponse, unauthorized } from '@/application/helpers';
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
    if (!authToken) return unauthorized(new UnauthorizedError());
    await this.authorize({ authToken, requiredPermission: this.requiredPermission });
  }
}
