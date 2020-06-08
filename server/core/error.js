import httpStatus from 'http-status';

export function errorMiddleware(err, req, res, next) {
  const errorCode = err.code || 500;
  const response = {
    ok: false,
    code: errorCode,
    message: err.message || `Error ${errorCode} ${httpStatus[errorCode]}`,
    errors: err.errors,
    stack: err.stack
  };

  if (process.env.NODE_ENV === 'production') {
    delete (response.stack);
  }

  res.status(errorCode);
  res.json(response);
  res.end();
}

export function notFoundMiddleware(req, res, next) {
  return errorMiddleware({
    message: `Not found`,
    code: httpStatus.NOT_FOUND
  }, req, res, next);
}