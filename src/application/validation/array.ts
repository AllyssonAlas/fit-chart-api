import { InvalidParamError } from '@/application/errors';
import type { Validator } from '@/application/validation';

export class RequiredArray implements Validator {
  constructor(
    readonly value: any,
    readonly fieldName: string,
  ) {}

  validate(): Error | undefined {
    if (!Array.isArray(this.value)) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
