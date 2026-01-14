
/*
  This middleware handles requests to undefined routes.
  It sends a 404 response with a not found message.
*/

// Middleware for undefined routes
export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    id: "NOT_FOUND",
    message: "Route not found",
  });
};
