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

var SelectBox = (0, _createReactClass2.default)({
  displayName: 'SelectBox',

  render: function render() {
    var _props = this.props,
        model = _props.model,
        renderOption = _props.renderOption,
        dataList = _props.dataList,
        onChange = _props.onChange,
        other = _objectWithoutProperties(_props, ['model', 'renderOption', 'dataList', 'onChange']);

    var valueModel = model;
    var handleChange = function handleChange(value) {
      if (onChange) valueModel.value = onChange(value);else valueModel.value = value;
    };

    var options = dataList.map(function (item) {
      return renderOption(item);
    });

    return _react2.default.createElement(
      _antd.Select,
      _extends({}, other, {
        onChange: handleChange,
        value: valueModel.value
      }),
      options
    );
  }
});

exports.default = SelectBox;