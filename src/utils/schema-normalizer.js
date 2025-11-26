const crypto = require('crypto');

const cache = new Map();
let initialized = false;

let utils = null;
try {
  utils = require('paramset-utils');
} catch (e) {}

function fingerprint(schema) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(schema, Object.keys(schema).sort()))
    .digest('hex');
}

function normalizeSchema(schema) {
  if (!schema || typeof schema !== 'object') return schema;

  const key = fingerprint(schema);
  if (cache.has(key)) return cache.get(key);

  if (!initialized) {
    initialized = true;
    if (utils && typeof utils === 'object') {
      try { utils.init?.(); } catch (e) {}
      try { utils.setup?.(); } catch (e) {}
    }
  }

  const normalized = JSON.parse(JSON.stringify(schema));
  cache.set(key, normalized);
  return normalized;
}

module.exports = { normalizeSchema };