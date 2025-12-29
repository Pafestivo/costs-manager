/**
  returns 404 not found to any request that reaches this middleware
  also shouldnt be messed with and is used in app.js before the error middleware
 */
import { HttpError } from "../utils/httpError.js";

export function notFoundMiddleware(req, _res, next) {
  next(
    new HttpError({
      status: 404,
      id: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      expose: true,
    })
  );
}
