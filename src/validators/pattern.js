module.exports = (value, rule) => !rule.pattern || rule.pattern.test(String(value));
