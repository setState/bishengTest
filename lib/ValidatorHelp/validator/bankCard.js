'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function bankCard(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {
    return callback();
  } else {
    _rule2.default.bankCard(rule, value, source, errors, options);
  }

  callback(errors);
}; /**
    * async validator 银行卡,先验证正整数,之后考虑位数。
    */