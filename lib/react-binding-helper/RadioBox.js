'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//todo opposite value
var RadioBox = (0, _createReactClass2.default)({
  displayName: 'RadioBox',
  isChecked: function isChecked() {
    var _props = this.props,
        model = _props.model,
        dataValue = _props.dataValue;


    if (model.value == dataValue) return true;else return false;
  },

  render: function render() {
    var _props2 = this.props,
        model = _props2.model,
        dataValue = _props2.dataValue,
        other = _objectWithoutProperties(_props2, ['model', 'dataValue']);

    var valueModel = model;
    var handleChange = function handleChange(e) {
      if (valueModel.value != dataValue) if (valueModel.value == "1") valueModel.value = "2";else valueModel.value = "1";
    };

    return _react2.default.createElement('input', _extends({}, other, { type: 'radio', onChange: handleChange, checked: this.isChecked() }));
  }
});

exports.default = RadioBox;