/**
 * async validator 身份证号码检查
 */

import rules from '../rule/';

const idCardNumberCheck = function idCardNumberCheck(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {

    return callback();

  } else {

    rules.idCardNumberCheck(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = idCardNumberCheck;
