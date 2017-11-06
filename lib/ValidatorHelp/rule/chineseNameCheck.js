'use strict';

var _util = require('../util');

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chineseNameCheck = function chineseNameCheck(rule, value, source, errors, options) {
  if ((0, _util.isChineseName)(value) == false) {
    if (value.length > 8) {
      errors.push(_messages2.default.chineseNameLengthCheck);
    }
    errors.push(_messages2.default.chineseNameCheck);
  }
};

module.exports = chineseNameCheck;