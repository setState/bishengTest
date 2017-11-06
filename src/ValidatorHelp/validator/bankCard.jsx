/**
 * async validator 银行卡,先验证正整数,之后考虑位数。
 */

import rules from '../rule/';

module.exports = function bankCard(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {
    return callback();
  } else {
    rules.bankCard(rule, value, source, errors, options);
  }

  callback(errors);
};
