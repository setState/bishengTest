'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Number = require('../Number');

var _Number2 = _interopRequireDefault(_Number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * 针对 null,""会自动显示为0的情况,处理为undefined
                                                                                                                                                                                                                              */

var InputBox = (0, _createReactClass2.default)({
  displayName: 'InputBox',

  propTypes: {
    max: _propTypes2.default.number,
    min: _propTypes2.default.number,
    step: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  },
  getDefaultProps: function getDefaultProps() {
    return {
      step: 1
    };
  },
  handleChange: function handleChange(value) {
    var model = this.props.model;


    model.value = value;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },
  render: function render() {
    var _props = this.props,
        model = _props.model,
        style = _props.style,
        onChange = _props.onChange,
        other = _objectWithoutProperties(_props, ['model', 'style', 'onChange']);

    var value = model.value;

    if (value === null || value === "") value = undefined;

    style = style || {};

    return _react2.default.createElement(_Number2.default, _extends({
      style: style
    }, other, {
      onChange: this.handleChange,
      size: 'large',
      value: value }));
  }
});

exports.default = InputBox;