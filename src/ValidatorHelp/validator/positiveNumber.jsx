/**
 * async validator 正数
 */

import rules from '../rule/';

const positiveNumber = function positiveNumber(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {
    return callback();
  } else {
    rules.positiveNumber(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = positiveNumber;
