class ValidationError extends Error {
  constructor(message, path = []) {
    super(message);
    this.name = 'ValidationError';
    this.path = path;
  }
}
module.exports = { ValidationError };
