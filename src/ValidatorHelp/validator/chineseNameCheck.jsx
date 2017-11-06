/**
 * async validator 中文姓名
 */

import rules from '../rule/';

const chineseNameCheck = function chineseNameCheck(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {

    return callback();

  } else {

    rules.chineseNameCheck(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = chineseNameCheck;
