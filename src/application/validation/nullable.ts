import { InvalidParamError } from '@/application/errors';

export class NullableParam {
  constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly valueType: string,
  ) {}

  validate(): Error {
    return new InvalidParamError(this.fieldName);
  }
}
