'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var identityCodeCheck = function identityCodeCheck(rule, value, callback, source, options) {
  var errors = [];

  if (!value) {

    return callback();
  } else {

    _rule2.default.identityCodeCheck(rule, value, source, errors, options);
  }

  callback(errors);
};

module.exports = identityCodeCheck;