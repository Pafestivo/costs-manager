
/*
  This middleware handles errors for the logs service.
  It sends a JSON response with error details and status code.
*/

// Error handling middleware
export const errorMiddleware = (err, req, res, next) => {
  const status = err?.status || 500;

  // Send error response
  res.status(status).json({
    id: err?.id || "INTERNAL_ERROR",
    message: err?.message || "An unexpected error occurred.",
  });
};
