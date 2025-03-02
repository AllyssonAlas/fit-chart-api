import {
  RequiredArray,
  RequiredLength,
  RequiredParam,
  RequiredPattern,
  RequiredString,
  RequiredStringArray,
  type Validator,
} from '@/application/validation';

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private fieldName = '',
    private readonly validators: Validator[] = [],
    private isOptional = false,
  ) {}

  static of(value: any): ValidationBuilder {
    return new ValidationBuilder(value || {});
  }

  field(fieldName: string): ValidationBuilder {
    this.fieldName = fieldName;
    this.validators.push(new RequiredParam(this.value, fieldName));
    return this;
  }

  subField(fieldName: string, subFieldFrom: string): ValidationBuilder {
    this.fieldName = fieldName;
    this.validators.push(new RequiredParam(this.value, fieldName, subFieldFrom));
    return this;
  }

  optional(): ValidationBuilder {
    this.isOptional = true;
    return this;
  }

  string(): ValidationBuilder {
    this.validators.push(new RequiredString(this.value[this.fieldName], this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validators.push(
      new RequiredPattern(this.value[this.fieldName], this.fieldName, /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gim),
    );
    return this;
  }

  length(length: number): ValidationBuilder {
    this.validators.push(new RequiredLength(this.value[this.fieldName], this.fieldName, length));
    return this;
  }

  postalCode(): ValidationBuilder {
    this.validators.push(new RequiredPattern(this.value[this.fieldName], this.fieldName, /^[0-9]{5}-[0-9]{3}$/));
    return this;
  }

  array(): ValidationBuilder {
    this.validators.push(new RequiredArray(this.value[this.fieldName], this.fieldName));
    return this;
  }

  stringArray(): ValidationBuilder {
    this.validators.push(new RequiredStringArray(this.value[this.fieldName], this.fieldName));
    return this;
  }

  build(): Validator[] {
    if (this.isOptional) {
      const findField = Object.keys(this.value).find((key) => key === this.fieldName);
      if (!findField) {
        this.validators.splice(0, this.validators.length);
      }
    }
    return this.validators;
  }
}
