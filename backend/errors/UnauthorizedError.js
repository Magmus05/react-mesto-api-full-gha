module.exports = class UNAUTHORIZED_ERROR  extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}