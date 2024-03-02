import { RequiredParamError } from '@/application/errors';

export class Required<T = any> {
  constructor(readonly value: T, readonly fieldName: string) {}

  validate(): Error {
    return new RequiredParamError(this.fieldName);
  }
}
