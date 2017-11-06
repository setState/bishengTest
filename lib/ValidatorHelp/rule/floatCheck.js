'use strict';

var _util = require('../util');

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floatCheck = function floatCheck(rule, value, source, errors, options) {
  if ((0, _util.isFloat)(value) == false) {
    errors.push(rule.message || _messages2.default.floatCheck);
  }
};

module.exports = floatCheck;