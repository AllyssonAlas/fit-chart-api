import { UnauthorizedError } from '@/application/errors';
import { type HttpResponse, unauthorized } from '@/application/helpers';

type HttpRequest = {
  authorization: string;
};

export class AuthorizationMiddleware {
  async handle(request: HttpRequest): Promise<HttpResponse<Error>> {
    return unauthorized(new UnauthorizedError());
  }
}
