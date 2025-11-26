class FieldBuilder {
  constructor(type) {
    this.field = { type };
  }
  required() { this.field.required = true; return this; }
  default(value) { this.field.default = value; return this; }
  min(n) { this.field.min = n; return this; }
  max(n) { this.field.max = n; return this; }
  pattern(re) { this.field.pattern = re; return this; }
  enum(values) { this.field.enum = values; return this; }
  length(n) { this.field.length = n; return this; }
  build() { return this.field; }
}

class SchemaBuilder {
  string() { return new FieldBuilder('string'); }
  number() { return new FieldBuilder('number'); }
  boolean() { return new FieldBuilder('boolean'); }
  object(schema) { return { type: 'object', schema }; }
  array(items) { return { type: 'array', items }; }
}

module.exports = { SchemaBuilder };
