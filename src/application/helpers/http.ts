import { ServerError } from '@/application/errors';

export type HttpResponse = {
  body: any;
  statusCode: number;
}

export const noContent = (): HttpResponse => ({
  body: null,
  statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400,
});

export const serverError = (error?: Error): HttpResponse => ({
  body: new ServerError(error),
  statusCode: 500,
});
