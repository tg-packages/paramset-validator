'use strict';

const { Validator } = require('./core/Validator');
const { SchemaBuilder } = require('./core/SchemaBuilder');
const { normalizeSchema } = require('./utils/schema-normalizer');

function create(schema, options) {
  return new Validator(normalizeSchema(schema), options);
}

function validate(input, schema, options) {
  return create(schema, options).run(input);
}

module.exports = {
  Validator,
  SchemaBuilder,
  create,
  validate,
  version: require('../package.json').version
};
