const { isJsonString } = require('./utils');
const log  = require('./logger');

class errorGenerator extends Error {
  /**
   * @description Custom error generator
   */
  status;
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.status || 500;
  const message = isJsonString(err.message)
    ? JSON.parse(err.message)
    : err.message || '';
  const stack = err.stack || '';

  if (statusCode === 500) {
    if (process.env.Environment === 'development') {
      log.error(`Message: ${message}`);
      log.error(`Stack: ${stack}`);
    }
    
    res.status(statusCode)
      .json({ error: "Server error has occurred. please try again later" });
  } else {
    res.status(statusCode).json({ error: message });
  }
}

module.exports = {
  errorGenerator,
  errorHandler
}
