/*
 * This file provides utilities for formatting error responses in the costs service.
 * It standardizes error output for consistent API responses and easier debugging.
 */
// toErrorResponse: Converts an error object to a standardized error response for the API.
export const toErrorResponse = (err, fallbackId = "INTERNAL_ERROR") => {
  const id = (err && err.id) || fallbackId;
  const message =
    err && err.expose && err.message ? err.message : "Something went wrong";
  return { id, message };
};
