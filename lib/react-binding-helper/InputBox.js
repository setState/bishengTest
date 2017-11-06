'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var InputBox = (0, _createReactClass2.default)({
  displayName: 'InputBox',
  handleChange: function handleChange(e) {
    var _props = this.props,
        model = _props.model,
        validator = _props.validator;

    var newValue = validator ? validator(e.target.value) : e.target.value;

    model.value = newValue.replace(/\s/g, '');

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },
  handleBlur: function handleBlur(e) {
    var model = this.props.model;

    model.value = e.target.value.replace(/\s/g, '');
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  render: function render() {
    var _props2 = this.props,
        model = _props2.model,
        validator = _props2.validator,
        style = _props2.style,
        onBlur = _props2.onBlur,
        onChange = _props2.onChange,
        other = _objectWithoutProperties(_props2, ['model', 'validator', 'style', 'onBlur', 'onChange']);

    style = style || {};
    style.border = '1px solid #d9d9d9 !important';

    return _react2.default.createElement(_antd.Input, _extends({ ref: 'input',
      style: style
    }, other, {
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      size: 'large',
      value: model.value }));
  }
});

exports.default = InputBox;