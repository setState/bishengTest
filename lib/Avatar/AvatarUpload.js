'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _ImageCropper = require('./ImageCropper');

var _ImageCropper2 = _interopRequireDefault(_ImageCropper);

var _ImageInput = require('./ImageInput');

var _ImageInput2 = _interopRequireDefault(_ImageInput);

var _uploadList = require('./uploadList');

var _uploadList2 = _interopRequireDefault(_uploadList);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prevCls = "ovo-avatar";

function noop() {}

function getFileItem(file, fileList) {
  var target = fileList.filter(function (item) {
    return item.key === file.key;
  })[0];
  return target;
}

var Upload = function (_React$Component) {
  _inherits(Upload, _React$Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this.onChange = function (fileInfo) {
      // final trigger
      var _this$props = _this.props,
          maxSize = _this$props.maxSize,
          onChange = _this$props.onChange;


      if (fileInfo.file.size / 1024 / 1024 >= maxSize) {
        _antd.message.error('\u56FE\u7247\u5FC5\u987B\u5C0F\u4E8E ' + maxSize + 'MB!');
      } else {
        _this.setState({
          fileList: [fileInfo]
        }, function () {
          if (onChange) {
            onChange(fileInfo);
          }
        });
      }
    };

    var fileList = [];

    if (_this.props.value) fileList.push({
      src: _this.props.value
    });

    _this.state = {
      fileList: fileList,
      initialed: false,
      croppingFileObj: null
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var fileList = [];

      if (nextProps.value) {
        if (typeof nextProps.value == "string") {
          fileList.push({
            src: nextProps.value
          });
        } else if (_typeof(nextProps.value) == "object") {
          fileList.push(nextProps.value);
        }
      }

      this.setState({ fileList: fileList });
    }
  }, {
    key: 'onFileLoaded',
    value: function onFileLoaded(fileObj) {
      // choose callback
      if (this.props.hiddenCropper === true) {
        this.cropImage(fileObj);
      } else {
        this.setState({ croppingFileObj: fileObj });
      }
    }
  }, {
    key: 'cropImage',
    value: function cropImage(fileObj, clip) {
      fileObj.clip = clip;

      this.onChange(fileObj);
    }
  }, {
    key: 'getUploadList',
    value: function getUploadList() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          objectFit = _props.objectFit;


      var uploadList = void 0;
      if (this.props.showUploadList) {
        if (this.state.fileList.length > 0) {

          uploadList = _react2.default.createElement(_uploadList2.default, {
            multi: false,
            preview: this.props.viewOnly,
            items: this.state.fileList,
            aspectRatio: this.props.aspectRatio,
            width: this.props.width,
            styles: {
              marginRight: 0
            },
            objectFit: objectFit
          });
        } else {
          uploadList = _react2.default.createElement(_antd.Icon, { type: 'plus', className: prevCls + '-uploader-trigger', style: {
              width: width,
              height: height
            } });
        }
      }
      return uploadList;
    }
  }, {
    key: 'getAspectRatio',
    value: function getAspectRatio() {
      var aspectRatio = this.props.aspectRatio;


      var aspectRatioNum = 1;

      if (aspectRatio && !(0, _isNaN2.default)(aspectRatio)) {

        aspectRatioNum = this.props.aspectRatio;
      }

      return {
        ratio: aspectRatioNum
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          cropper = _props2.cropper,
          viewOnly = _props2.viewOnly,
          width = _props2.width,
          height = _props2.height,
          props = _objectWithoutProperties(_props2, ['cropper', 'viewOnly', 'width', 'height']);

      var inputProps = _extends({}, props, {
        onFileLoaded: this.onFileLoaded.bind(this),
        viewOnly: false
      });

      var aspectRatio = this.getAspectRatio();

      var uploadList = this.getUploadList();

      var cropperProps = {
        fileObj: this.state.croppingFileObj,
        onImageCrop: this.cropImage.bind(this),
        aspectRatio: aspectRatio.ratio,
        quality: this.props.cropQuality
      };

      return _react2.default.createElement(
        'div',
        { className: prevCls, style: { position: 'relative', height: height, width: width } },
        uploadList,
        _react2.default.createElement(
          _ImageInput2.default,
          inputProps,
          this.props.children
        ),
        _react2.default.createElement(_ImageCropper2.default, cropperProps)
      );
    }

    // useful api

  }, {
    key: 'getAllFile',
    value: function getAllFile() {
      var fileList = this.state.fileList;


      var arr = [];

      fileList.forEach(function (val) {
        if (val.file) arr[arr.length] = val.file;
      });

      return arr;
    }
  }, {
    key: 'removeAllFiles',
    value: function removeAllFiles() {
      this.setState({ fileList: [] });
    }
  }]);

  return Upload;
}(_react2.default.Component);

Upload.defaultProps = {
  multiple: false,
  onChange: noop,
  showUploadList: true,
  className: '',
  aspectRatio: 4 / 3,
  cropQuality: 0.9,
  width: 96,
  hiddenCropper: true,
  maxSize: 10
};
exports.default = Upload;