const errorHandler = (err, req, res, next) => {
  // Log error stack for debugging
  console.error(err.stack || err);
  
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Server error';

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    status = 400;
    const key = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${key}. Please use another value.`;
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    status = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  res.status(status).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? {
      message: err.message,
      stack: err.stack,
      ...err
    } : {}
  });
};

module.exports = errorHandler;
