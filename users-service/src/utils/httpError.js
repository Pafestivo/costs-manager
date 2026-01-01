/**
  this is a custom error class that you can and should use for throwing known errors
  it will must likely be used in your services and controllers
  for example if a user doesn't exist usage will look something like this:
  if (!user) {
    throw new HttpError({
      status: 404,
      id: "USER_NOT_FOUND",
      message: "User not found",
      expose: true
    });
  }

  the expose boolean is used to determine whether the message should be sent to the client or not
  usually errors that caused by the user doing something wrong, you expose to tell them what they did wrong
  errors that are internal server errors like mongo timeout shouldn't be exposed to avoid leaking sensitive info

 */
export class HttpError extends Error {
  constructor({
    status = 500,
    id = "INTERNAL_ERROR",
    message = "Error",
    expose = false,
  }) {
    super(message);
    this.status = status;
    this.id = id;
    this.expose = expose;
  }
}
