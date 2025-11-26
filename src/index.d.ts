export class Validator {
  constructor(schema: any, options?: ValidatorOptions);
  run(input: any): ValidationResult;
}

export class SchemaBuilder {
  string(): FieldBuilder;
  number(): FieldBuilder;
  boolean(): FieldBuilder;
  object(schema: any): FieldBuilder;
  array(items: any): FieldBuilder;
  build(): any;
}

export interface ValidatorOptions {
  strict?: boolean;
  transform?: boolean;
  allowUnknown?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  data: any;
  errors: string[];
  warnings?: string[];
}

export function create(schema: any, options?: ValidatorOptions): Validator;
export function validate(input: any, schema: any, options?: ValidatorOptions): ValidationResult;
export const version: string;
