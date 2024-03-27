const log = require('fancy-log');

/**
 * @description Global logger
 */
class Log {
  constructor() {
    this.console = global.console.log;
  }

  console(message) {
    this.console(message);
  }

  normal(message) {
    log(message);
  }

  error(message) {
    log.error(message);
  }

  warning(message) {
    log.warn(message);
  }

  info(message) {
    log.info(message);
  }
}

module.exports = new Log();