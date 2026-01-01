import { HttpError } from "../utils/httpError.js";

export const notFoundMiddleware = (req, _res, next) => {
  next(
    new HttpError({
      status: 404,
      id: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      expose: true,
    })
  );
};
