const AppError = require("../utils/AppError");

function notFound(req, res, next) {
  const error = new AppError(`Route not found - ${req.originalUrl}`, 404);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

module.exports = {
  notFound,
  errorHandler,
};