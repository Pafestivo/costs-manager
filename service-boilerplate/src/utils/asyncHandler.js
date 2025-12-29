/**
  this is a utility to wrap async routes, you shouldn't change anything here but you should use it in your controllers
  usage: router.get('/', asyncHandler(async (req, res) => { ... }))
  you can check the placeholder health route for an example
  without this errors will not be passed to the error middleware correctly
 */
export function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
