const { validationResult } = require('express-validator');
const { errorGenerator} = require('../helpers/error');
const _ = require('lodash');

class validator {
  /**
   * @description Incoming data validator
   */
  async validationData(req) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = this.errorsSeparator(errors);

      throw new errorGenerator(JSON.stringify(messages), 400);
    }
    return true;
  }

  /**
   * @description It separates validation error messages
   */
  errorsSeparator(errorsArray) {
    const errors = errorsArray.array();
    const messagesArray = _.map(errors, "msg");
    const paramArray = _.map(errors, "path");
    const messages = _.zipObject(paramArray, messagesArray);
    return messages;
  }
}

module.exports = new validator();