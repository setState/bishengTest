'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floatCheck = function floatCheck(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {

    return callback();
  } else {

    _rule2.default.floatCheck(rule, value, source, errors, options);
  }

  callback(errors);
};

module.exports = floatCheck;