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
    private optionalFields: string[] = [],
  ) {}

  static of(value: any): ValidationBuilder {
    return new ValidationBuilder(value || {});
  }

  private resetFieldName(fieldName: string): void {
    this.fieldName = fieldName;
  }

  field(fieldName: string): ValidationBuilder {
    this.resetFieldName(fieldName);
    this.validators.push(new RequiredParam(this.value, fieldName));
    return this;
  }

  subField(fieldName: string, subFieldFrom: string): ValidationBuilder {
    this.resetFieldName(fieldName);
    this.validators.push(new RequiredParam(this.value, fieldName, subFieldFrom));
    return this;
  }

  optional(): ValidationBuilder {
    this.optionalFields.push(this.fieldName);
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
    if (this.optionalFields.length) {
      const filteredValidators = this.validators.filter(({ fieldName }) => {
        if (!this.optionalFields.includes(fieldName)) {
          return true;
        }
        const findField = Object.keys(this.value).find((key) => key === fieldName);
        return findField && this.optionalFields.includes(fieldName);
      });
      return filteredValidators;
    }
    return this.validators;
  }
}
