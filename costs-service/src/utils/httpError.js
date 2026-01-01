export class HttpError extends Error {
  constructor({
    status = 500,
    id = "INTERNAL_ERROR",
    message = "Error",
    expose = false,
  }) {
    super(message);
    this.status = status;
    this.id = id;
    this.expose = expose;
  }
}
