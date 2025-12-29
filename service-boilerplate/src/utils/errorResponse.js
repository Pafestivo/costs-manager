/**
  this file shouldn't be messed with or manually used 
  it's used automatically by the error middleware to normalize errors
 */
export function toErrorResponse(err, fallbackId = "INTERNAL_ERROR") {
  const id = (err && err.id) || fallbackId;
  const message =
    err && err.expose && err.message ? err.message : "Something went wrong";
  return { id, message };
}
