const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  console.log(error.name);

  if (error.name === "SequelizeValidationError") {
    status = 400;
    message = error.error[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.error[0].message;
  }

  if (
    error.name === "SequelizeDatabaseError" ||
    error.name === "SequelizeForeignKeyConstraintError"
  ) {
    status = 400;
    message = "Invalid or wrong input (400)";
  }

  if (error.name === "InvalidLogin") {
    status = 400;
    message = "Please insert your username or password (400)";
  }

  if (error.name === "LoginError") {
    status = 401;
    message = "Please login first (401)";
  }

  if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
    status = 401;
    message = "Please login first";
  }

  if (error.name === "Forbidden") {
    status = 403;
    message = "Access denied";
  }

  if (error.name === "NotFound") {
    status = 404;
    message = "Not Found";
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
