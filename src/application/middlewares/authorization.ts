import type { Middleware } from '@/application/contracts';
import { ForbiddenError, UnauthorizedError } from '@/application/errors';
import { type HttpResponse, forbidden, ok, unauthorized } from '@/application/helpers';
import { RequiredString } from '@/application/validation';
import type { Authorization } from '@/domain/usecases';

type HttpRequest = {
  authorization: string;
};

type Model = { userId: string } | Error;

export class AuthorizationMiddleware implements Middleware {
  constructor(
    private readonly authorize: Authorization,
    private readonly requiredPermission: string,
  ) {}

  async handle({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (this.validate({ authorization })) return unauthorized(new UnauthorizedError());
      const result = await this.authorize({ authToken: authorization, requiredPermission: this.requiredPermission });
      return ok(result);
    } catch (error) {
      return forbidden(new ForbiddenError());
    }
  }

  private validate({ authorization }: HttpRequest): boolean {
    const error = new RequiredString(authorization, 'authorization').validate();
    return !!error;
  }
}
