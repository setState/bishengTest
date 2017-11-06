'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImgUpload = require('./ImgUpload');

var _ImgUpload2 = _interopRequireDefault(_ImgUpload);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = _react2.default.createClass({
  displayName: 'MultipleImgUpload',

  getInitialState: function getInitialState() {
    return {
      addable: true
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      text: '上传图片'
    };
  },
  getAllFile: function getAllFile() {
    return this.refs.imgUpload.getAllFile();
  },
  reset: function reset() {
    return this.refs.imgUpload.reset();
  },
  removeAllFiles: function removeAllFiles() {
    return this.refs.imgUpload.removeAllFiles();
  },
  onRemove: function onRemove(file) {
    if (this.props.onRemove && file.key && file.key.toString().indexOf("__imageid__") !== 0) {
      this.props.onRemove(file.key, file);
    }
  },
  onChange: function onChange(file, fileList) {
    this.props.onChange && this.props.onChange(file);
  },
  renderChild: function renderChild() {
    var addable = this.state.addable;

    if (addable === false) {
      return null;
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'upload-input-container' },
        _react2.default.createElement(_antd.Icon, { type: 'plus' }),
        _react2.default.createElement(
          'div',
          { className: 'ant-upload-text' },
          this.props.text
        )
      );
    }
  },
  render: function render() {
    var _props = this.props,
        onRemove = _props.onRemove,
        onChange = _props.onChange,
        others = _objectWithoutProperties(_props, ['onRemove', 'onChange']);

    return _react2.default.createElement(
      _ImgUpload2.default,
      _extends({ ref: 'imgUpload', onRemove: this.onRemove, onChange: this.onChange }, others),
      this.renderChild()
    );
  }
});