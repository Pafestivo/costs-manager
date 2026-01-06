// Not found middleware
export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    id: "NOT_FOUND",
    message: "Route not found",
  });
};
