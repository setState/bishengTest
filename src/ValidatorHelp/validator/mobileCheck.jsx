/**
 * async validator 电话号码
 */

import rules from '../rule/';

const mobileCheck = function mobileCheck(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {

    return callback();

  } else {

    rules.mobileCheck(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = mobileCheck;
