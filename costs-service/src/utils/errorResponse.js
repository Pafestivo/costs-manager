export const toErrorResponse = (err, fallbackId = "INTERNAL_ERROR") => {
  const id = (err && err.id) || fallbackId;
  const message =
    err && err.expose && err.message ? err.message : "Something went wrong";
  return { id, message };
};
