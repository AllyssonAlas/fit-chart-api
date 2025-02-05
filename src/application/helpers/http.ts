import { ServerError } from '@/application/errors';

export type HttpResponse<T = any> = {
  data: T;
  statusCode: number;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  data,
  statusCode: 200,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  data: error,
  statusCode: 400,
});

export const unauthorized = (error: Error): HttpResponse<Error> => ({
  data: error,
  statusCode: 401,
});

export const forbidden = (error: Error): HttpResponse<Error> => ({
  data: error,
  statusCode: 403,
});

export const serverError = (error?: Error): HttpResponse<Error> => ({
  data: new ServerError(error),
  statusCode: 500,
});
