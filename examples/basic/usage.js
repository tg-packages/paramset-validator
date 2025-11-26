const { validate } = require('../../src');

const config = { port: 3000 };
const schema = {
  port: { type: 'number', required: true, min: 1000 },
  host: { type: 'string', default: 'localhost' }
};

const result = validate(config, schema);
console.log('Valid:', result.valid);
console.log('Data:', result.data);
