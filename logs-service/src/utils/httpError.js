
/*
  This file defines a custom HTTP error class for the logs service.
  It extends the Error class to include id and status properties.
*/

// Custom HTTP error class
class HttpError extends Error {
  constructor(id, message, status = 500) {
    super(message);
    this.id = id;
    this.status = status;
  }
}

module.exports = HttpError;
