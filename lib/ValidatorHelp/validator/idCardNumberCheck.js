'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idCardNumberCheck = function idCardNumberCheck(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {

    return callback();
  } else {

    _rule2.default.idCardNumberCheck(rule, value, source, errors, options);
  }

  callback(errors);
}; /**
    * async validator 身份证号码检查
    */

module.exports = idCardNumberCheck;