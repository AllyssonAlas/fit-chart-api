import { ServerError } from '@/application/errors';

export type HttpResponse = {
  data: any;
  statusCode: number;
}

export const noContent = (): HttpResponse => ({
  data: null,
  statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse => ({
  data: error,
  statusCode: 400,
});

export const serverError = (error?: Error): HttpResponse => ({
  data: new ServerError(error),
  statusCode: 500,
});
