'use strict';

var _util = require('../util');

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mobileCheck = function mobileCheck(rule, value, source, errors, options) {
  if ((0, _util.isMobileNumber)(value) == false) {
    errors.push(rule.message || _messages2.default.mobileCheck);
  }
};

module.exports = mobileCheck;