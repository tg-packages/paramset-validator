module.exports = (value, rule) => !rule.enum || rule.enum.includes(value);
