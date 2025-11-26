module.exports = (value, rule) => !rule.required || (value !== undefined && value !== null);
