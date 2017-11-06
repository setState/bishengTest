'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _antd = require('antd');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prevCls = "ovo-avatar";

var now = +new Date();
var index = 0;
function imageid() {
  return '__imageid__' + now + '-' + ++index;
}

var ImageInput = (0, _createReactClass2.default)({
  displayName: 'ImageInput',


  propTypes: {
    onFileLoaded: _react.PropTypes.func
  },

  onChange: function onChange(e) {
    var _this = this;

    var files = e.target.files;
    var reader = new FileReader();

    reader.onload = function () {

      var type = files[0].type.split('/')[0];

      if (type && type == "image") {

        _this.onFileLoaded(files[0], reader.result);
      } else {
        _antd.message.error('请选择图片！');
      }
    };

    reader.readAsDataURL(files[0]);
  },
  onFileLoaded: function onFileLoaded(file, src) {

    var fileObj = {
      file: file,
      src: src,
      key: imageid()
    };

    this.props.onFileLoaded && this.props.onFileLoaded(fileObj);
  },
  onClick: function onClick() {
    var el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },
  onKeyDown: function onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },
  render: function render() {

    var props = this.props;

    var styles = props.styles,
        viewOnly = props.viewOnly;


    var show = {
      display: "block"
    };

    if (viewOnly === true) {
      show.display = 'none';
    }

    return _react2.default.createElement(
      'div',
      {
        className: prevCls + '-field',
        style: (0, _objectAssign2.default)({}, styles, show),
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        onDrop: this.onFileDrop,
        onDragOver: this.onFileDrop,
        role: 'button',
        tabIndex: '0'
      },
      _react2.default.createElement('input', { type: 'file',
        ref: 'file',
        style: { display: 'none' },
        disabled: props.disabled,
        accept: props.accept,
        multiple: this.props.multiple,
        onChange: this.onChange }),
      props.children
    );
  }
});

exports.default = ImageInput;