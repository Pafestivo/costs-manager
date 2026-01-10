
/*
  This utility wraps async route handlers to catch errors and pass them to next middleware.
  It helps avoid repetitive try/catch blocks in controllers.
*/

// Async handler wrapper
module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
