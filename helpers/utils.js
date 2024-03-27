/**
 * @description To check if the string is a valid JSON string
 */
module.exports.isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * @description To check if the string is a number
 */
module.exports.isStringNumber = (str) => {
  return /^-?\d+$/.test(str);
};