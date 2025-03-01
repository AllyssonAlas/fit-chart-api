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
export class RequiredStringArray extends RequiredArray {
  constructor(
    override readonly value: any[],
    override readonly fieldName: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    const findNoStringValue = this.value.find((v) => !(typeof v === 'string'));
    if (findNoStringValue) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
