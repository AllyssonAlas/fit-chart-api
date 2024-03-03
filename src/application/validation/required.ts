import { RequiredParamError } from '@/application/errors';
import { Validator } from '@/application/validation';

export class Required<T = any> implements Validator {
  constructor(readonly value: T, readonly fieldName: string) {}

  validate(): Error | undefined {
    if (!this.value) {
      return new RequiredParamError(this.fieldName);
    }
  }
}

export class RequiredParam extends Required {
  constructor(override readonly value: object, override readonly fieldName: string) {
    super(value, fieldName);
  }

  validate(): Error {
    return new RequiredParamError(this.fieldName);
  }
}
