import { ServerError } from '@/application/errors';

export type HttpResponse<T = any> = {
  data: T;
  statusCode: number;
}

export const noContent = (): HttpResponse<null> => ({
  data: null,
  statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  data: error,
  statusCode: 400,
});

export const serverError = (error?: Error): HttpResponse<Error> => ({
  data: new ServerError(error),
  statusCode: 500,
});
