'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chineseNameCheck = function chineseNameCheck(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {

    return callback();
  } else {

    _rule2.default.chineseNameCheck(rule, value, source, errors, options);
  }

  callback(errors);
}; /**
    * async validator 中文姓名
    */

module.exports = chineseNameCheck;