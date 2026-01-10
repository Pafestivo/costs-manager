/*
 * This file provides a utility for handling asynchronous route handlers in Express.js.
 * It ensures that any errors thrown in async functions are properly caught and passed to Express error handling middleware.
 */

export const asyncHandler = (fn) => {
  // asyncHandler: Wraps an async route handler to catch errors and forward them to next().
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
