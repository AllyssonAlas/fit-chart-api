import { RequiredParam, RequiredPattern, RequiredString, Validator } from '@/application/validation';

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = [],
  ) {}

  static of(value: any, fieldName: string): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(subFieldFrom?: string): ValidationBuilder {
    if (subFieldFrom) {
      this.validators.push(new RequiredParam(this.value, this.fieldName, subFieldFrom));
    } else {
      this.validators.push(new RequiredParam(this.value, this.fieldName));
    }
    return this;
  }

  string(): ValidationBuilder {
    this.validators.push(new RequiredString(this.value[this.fieldName], this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validators.push(new RequiredPattern(this.value[this.fieldName], this.fieldName, /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi));
    return this;
  }

  postalCode(): ValidationBuilder {
    this.validators.push(new RequiredPattern(this.value[this.fieldName], this.fieldName, /^[0-9]{5}-[0-9]{3}$/));
    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
