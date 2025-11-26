class Validator {
  constructor(schema, options = {}) {
    this.schema = schema || {};
    this.options = {
      strict: false,
      transform: true,
      allowUnknown: false,
      ...options
    };
  }

  run(input = {}) {
    const errors = [];
    const warnings = [];
    const data = this._process(input, this.schema, [], errors, warnings);
    return { valid: errors.length === 0, data, errors, warnings };
  }

  _process(value, rule, path, errors, warnings) {
    if (!rule) return value;

    if (rule.required && (value === undefined || value === null)) {
      errors.push(`${path.join('.') || 'root'} is required`);
      return value;
    }

    if (value === undefined && rule.default !== undefined) {
      return rule.default;
    }

    if (value !== undefined && value !== null) {
      if (rule.type && typeof value !== rule.type) {
        errors.push(`${path.join('.')} must be ${rule.type}`);
      }
      if (rule.enum && !rule.enum.includes(value)) {
        errors.push(`${path.join('.')} must be one of [${rule.enum.join(', ')}]`);
      }
      if (rule.min !== undefined && value < rule.min) errors.push(`${path.join('.')} must be >= ${rule.min}`);
      if (rule.max !== undefined && value > rule.max) errors.push(`${path.join('.')} must be <= ${rule.max}`);
      if (rule.pattern && !rule.pattern.test(String(value))) errors.push(`${path.join('.')} failed pattern check`);
      if (rule.length && String(value).length !== rule.length) errors.push(`${path.join('.')} must have length ${rule.length}`);
    }

    if (rule.schema && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const result = {};
      for (const key in rule.schema) {
        result[key] = this._process(value[key], rule.schema[key], path.concat(key), errors, warnings);
      }
      if (!this.options.allowUnknown) {
        for (const key in value) {
          if (!(key in rule.schema)) warnings.push(`Unknown property: ${path.concat(key).join('.')}`);
        }
      }
      return result;
    }

    return value;
  }
}

module.exports = { Validator };
