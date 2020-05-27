class RegistrationError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegistrationError);
    }

    this.name = "RegistrationError";
  }
}

module.exports = RegistrationError;
