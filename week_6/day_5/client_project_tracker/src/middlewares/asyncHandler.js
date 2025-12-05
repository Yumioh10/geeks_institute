// Async error handler wrapper
// Catches errors in async route handlers and passes them to error middleware
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};