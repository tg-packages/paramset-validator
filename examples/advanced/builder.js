const { SchemaBuilder } = require('../../src');
const builder = new SchemaBuilder();

const schema = {
  api: {
    schema: {
      endpoint: builder.string().required().pattern(/^https?:\/\//).build(),
      timeout: builder.number().default(5000).min(1000).build()
    }
  }
};

console.log('Schema built with fluent API');
