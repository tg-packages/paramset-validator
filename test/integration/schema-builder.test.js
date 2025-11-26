const { SchemaBuilder } = require('../../src');

test('fluent schema builder', () => {
  const builder = new SchemaBuilder();
  const schema = {
    port: builder.number().required().min(1024).max(65535).build(),
    debug: builder.boolean().default(false).build()
  };
  // Schema is valid structure
  expect(schema.port.type).toBe('number');
  expect(schema.debug.default).toBe(false);
});
