'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

var _Util = require('../../Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultAccept = ["image/jpeg", "image/png"],
    defaultMaxSize = 0.4;

function getAllowFileType(accept) {
  return accept.map(function (item) {
    return item.split('/')[1];
  }).join(",");
}

module.exports = function positiveInteger(rule, value, source, errors, options) {
  var maxSize = rule.maxSize || defaultMaxSize,
      accept = rule.accept || defaultAccept;

  if (!value) {
    errors.push(_messages2.default.avatar.required);
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
    if (accept.indexOf(value.file.type) == -1) errors.push(_Util2.default.format(_messages2.default.avatar.type, getAllowFileType(accept)));else if (value.file.size > maxSize * 1024 * 1024) errors.push(_Util2.default.format(_messages2.default.avatar.size, maxSize));
  }
};