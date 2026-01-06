// HTTP error class
class HttpError extends Error {
  constructor(id, message, status = 500) {
    super(message);
    this.id = id;
    this.status = status;
  }
}

module.exports = HttpError;
