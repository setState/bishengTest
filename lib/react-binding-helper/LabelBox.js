'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LabelBox = (0, _createReactClass2.default)({
  displayName: 'LabelBox',
  render: function render() {
    var _props = this.props,
        model = _props.model,
        other = _objectWithoutProperties(_props, ['model']);

    var valueModel = model;

    return _react2.default.createElement(
      'label',
      other,
      valueModel.value
    );
  }
});

exports.default = LabelBox;