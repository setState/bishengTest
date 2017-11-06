'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _AvatarUpload = require('./AvatarUpload');

var _AvatarUpload2 = _interopRequireDefault(_AvatarUpload);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var prevCls = "ovo-avatar";

var Avatar = (0, _createReactClass2.default)({
  displayName: 'Avatar',

  getDefaultProps: function getDefaultProps() {
    return {
      text: '选择图片',
      width: 96,
      height: 96
    };
  },
  onChange: function onChange(file) {
    this.props.onChange(file);
  },
  render: function render() {
    var _props = this.props,
        text = _props.text,
        others = _objectWithoutProperties(_props, ['text']);

    return _react2.default.createElement(
      _AvatarUpload2.default,
      _extends({
        onChange: this.onChange
      }, others),
      _react2.default.createElement(
        'div',
        { className: prevCls + '-container',
          style: {
            width: this.props.width,
            height: this.props.height,
            lineHeight: this.props.height + "px"
          } },
        _react2.default.createElement(
          'div',
          { className: prevCls + '-text' },
          text
        )
      )
    );
  }
});

exports.default = Avatar;