/*
  This utility wraps async route handlers to catch errors and pass them to next middleware.
  It helps avoid repetitive try/catch blocks in controllers.
*/

// Async handler wrapper
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
