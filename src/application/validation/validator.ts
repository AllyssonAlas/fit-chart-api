export interface Validator {
  fieldName: string;
  validate(): Error | undefined;
}
