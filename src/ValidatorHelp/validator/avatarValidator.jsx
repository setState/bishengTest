/**
 * Created by neo on 2017/1/16.
 * Avatar组件验证
 */

import rules from '../rule/';

const avatarValidator = function avatarValidator(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {
    return callback();
  } else {
    rules.avatarValidator(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = avatarValidator;
