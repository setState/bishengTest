'use strict';

var _util = require('../util');

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function bankCard(rule, value, source, errors, options) {
  if ((0, _util.isBankCard)(value) == false) {
    errors.push(rule.message || _messages2.default.bankCard);
  } else if (value.length < 12 || value.length > 19) errors.push(_messages2.default.bankCardLength);
};