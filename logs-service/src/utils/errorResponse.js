
/*
  This utility creates error objects with custom id, message, and status.
  It is used to standardize error responses in the logs service.
*/

// Error response factory
module.exports = (id, message, status = 500) => {
  const err = new Error(message);
  err.id = id;
  err.status = status;
  return err;
};
