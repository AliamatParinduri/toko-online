exports.responseError = (next, code, message) => {
  const err = new Error(message)
  err.statusCode = code
  next(err)
}

exports.responseMessage = (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message,
  })
}
