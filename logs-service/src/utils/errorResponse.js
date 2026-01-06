// Common error response utility
module.exports = (id, message, status = 500) => {
  const err = new Error(message);
  err.id = id;
  err.status = status;
  return err;
};
