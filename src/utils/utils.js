const bigNumber = require('big-number');

exports.setLocalStorage = ({ key, value }) => {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
};

exports.getLocalStorage = ({ key }) => {
  const result = localStorage.getItem(key);

  return JSON.parse(result);
};

exports.removeLocalStorage = ({ key }) => {
  localStorage.removeItem(key);
};

exports.getMultipliedByDecimalBN = ({ amount, decimals }) => {
  return bigNumber(amount).multiply(Math.pow(10, decimals));
};
exports.getDividedOnDecimal = ({ amount, decimals }) => {
  return Math.trunc(amount / Math.pow(10, decimals));
};
