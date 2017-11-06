'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positiveNumber = function positiveNumber(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {
    return callback();
  } else {
    _rule2.default.positiveNumber(rule, value, source, errors, options);
  }

  callback(errors);
}; /**
    * async validator 正数
    */

module.exports = positiveNumber;