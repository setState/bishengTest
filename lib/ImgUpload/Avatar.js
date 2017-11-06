'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AvatarUpload = require('./AvatarUpload');

var _AvatarUpload2 = _interopRequireDefault(_AvatarUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = _react2.default.createClass({
  displayName: 'Avatar',

  getDefaultProps: function getDefaultProps() {
    return {
      text: '点击上传',
      width: 96,
      height: 96
    };
  },
  getAllFile: function getAllFile() {
    return this.refs.imgUpload.getAllFile();
  },
  removeAllFiles: function removeAllFiles() {
    return this.refs.imgUpload.removeAllFiles();
  },
  onRemove: function onRemove(file) {
    if (this.props.onRemove) {
      this.props.onRemove(file.key, file);
    }
  },
  render: function render() {
    var _props = this.props,
        onRemove = _props.onRemove,
        others = _objectWithoutProperties(_props, ['onRemove']);

    return _react2.default.createElement(
      _AvatarUpload2.default,
      _extends({ ref: 'imgUpload', onRemove: this.onRemove }, others),
      _react2.default.createElement(
        'div',
        { className: 'upload-input-container',
          style: {
            width: this.props.width,
            height: this.props.height,
            lineHeight: this.props.height + "px"
          } },
        _react2.default.createElement(
          'div',
          { className: 'ant-upload-text' },
          this.props.text
        )
      )
    );
  }
});