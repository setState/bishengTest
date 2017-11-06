'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SelectBox = require('./SelectBox');

var _SelectBox2 = _interopRequireDefault(_SelectBox);

var _InputBox = require('./InputBox');

var _InputBox2 = _interopRequireDefault(_InputBox);

var _InputNumberBox = require('./InputNumberBox');

var _InputNumberBox2 = _interopRequireDefault(_InputNumberBox);

var _RadioBox = require('./RadioBox');

var _RadioBox2 = _interopRequireDefault(_RadioBox);

var _LabelBox = require('./LabelBox');

var _LabelBox2 = _interopRequireDefault(_LabelBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  SelectBox: _SelectBox2.default,
  InputBox: _InputBox2.default,
  InputNumberBox: _InputNumberBox2.default,
  RadioBox: _RadioBox2.default,
  LabelBox: _LabelBox2.default
}; /**
    * component for react-binding
    * depend on ant-design
    */