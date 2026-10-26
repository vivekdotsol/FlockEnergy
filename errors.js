function HttpError(status, code, message) {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  return err;
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    error: { code: err.code || "INTERNAL", message: err.message },
  });
}
module.exports = { HttpError, errorHandler };
