const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  const statusCode = res.statusCode || constants.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  switch (statusCode) {
    case constants.VALIDATION_FAILED:
      res.status(statusCode).json({
        title: "Validation Failed",
        message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message,
        stackTrace: err.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.status(statusCode).json({
        title: "Internal Server Error",
        message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error, all good");
      break;
  }
};

module.exports = errorHandler;
