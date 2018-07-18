const util = require("util");

class AuthError {
  constructor(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);
    this.message = message;
  }
}

util.inherits(AuthError, Error);

AuthError.prototype.name = "AuthError";

exports.AuthError = AuthError;
