// src/middleware/error.middleware.js
export const errorMiddleware = (err, req, res, next) => {
  const status = err?.status || 500;

  res.status(status).json({
    id: err?.id || "INTERNAL_ERROR",
    message: err?.message || "An unexpected error occurred.",
  });
};
