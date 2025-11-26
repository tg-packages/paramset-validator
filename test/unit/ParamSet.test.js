test('basic validation works', () => {
  const { Validator } = require('../../src');
  const schema = { foo: { type: 'string', required: true } };
  const result = Validator.create(schema).validate({ foo: 'bar' });
  expect(result.valid).toBe(true);
  expect(result.data.foo).toBe('bar');
});
