import { InvalidParamError, LengthParamError, RequiredParamError, RequiredSubParamError } from '@/application/errors';
import type { Validator } from '@/application/validation';

export class Required<T = any> implements Validator {
  constructor(
    readonly value: T,
    readonly fieldName: string,
  ) {}

  validate(): Error | undefined {
    if (!this.value) {
      return new RequiredParamError(this.fieldName);
    }
  }
}

export class RequiredParam extends Required {
  constructor(
    override readonly value: object,
    override readonly fieldName: string,
    readonly subFieldFrom?: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    if (super.validate() || !this.value[this.fieldName as keyof typeof this.value]) {
      return this.subFieldFrom
        ? new RequiredSubParamError(this.subFieldFrom, this.fieldName)
        : new RequiredParamError(this.fieldName);
    }
  }
}

export class RequiredString extends Required {
  constructor(
    override readonly value: string,
    override readonly fieldName: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    if (super.validate() || !(typeof this.value === 'string')) {
      return new InvalidParamError(this.fieldName);
    }
  }
}

export class RequiredNumber extends Required {
  constructor(
    override readonly value: number,
    override readonly fieldName: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error {
    return new InvalidParamError(this.fieldName);
  }
}

export class RequiredPattern extends RequiredString {
  constructor(
    override readonly value: string,
    override readonly fieldName: string,
    readonly pattern: RegExp,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    if (super.validate() || !this.pattern.test(this.value)) {
      return new InvalidParamError(this.fieldName);
    }
  }
}

export class RequiredLength extends RequiredString {
  constructor(
    override readonly value: string,
    override readonly fieldName: string,
    readonly length: number,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    if (super.validate() || this.value.length !== this.length) {
      return new LengthParamError(this.fieldName, this.length);
    }
  }
}
