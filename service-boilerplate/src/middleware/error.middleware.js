/**
  global error handling middleware, also should not be messed with
  must be the last middleware in app.js
  all errors are normalized to { id, message } as required
 */
import { logger } from "../logger/pino.js";
import { toErrorResponse } from "../utils/errorResponse.js";

export const errorMiddleware = (err, _req, res, _next) => {
  const status = Number.isInteger(err?.status) ? err.status : 500;

  // real error with stack on the server side
  logger.error({ err, status }, "request_failed");

  // normalized error to the client with no sensitive info
  res.status(status).json(toErrorResponse(err));
};
