'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var avatarValidator = function avatarValidator(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {
    return callback();
  } else {
    _rule2.default.avatarValidator(rule, value, source, errors, options);
  }

  callback(errors);
}; /**
    * Created by neo on 2017/1/16.
    * Avatar组件验证
    */

module.exports = avatarValidator;