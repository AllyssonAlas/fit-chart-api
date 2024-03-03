import { InvalidParamError, RequiredParamError } from '@/application/errors';
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

  validate(): Error | undefined {
    if (!super.validate() && !Object.keys(this.value).includes(this.fieldName)) {
      return new RequiredParamError(this.fieldName);
    }
  }
}

export class RequiredString extends Required {
  constructor(override readonly value: string, override readonly fieldName: string) {
    super(value, fieldName);
  }

  validate(): Error {
    return new InvalidParamError(this.fieldName);
  }
}
