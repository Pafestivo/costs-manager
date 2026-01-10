/*
 * This file defines the HttpError class for standardized HTTP error handling in the costs service.
 * It enables consistent error structure and status management for API responses.
 */
// HttpError: Custom error class for HTTP errors with status, id, message, and expose flag.
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
