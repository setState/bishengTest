'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImageCropper = require('./ImageCropper');

var _ImageCropper2 = _interopRequireDefault(_ImageCropper);

var _ImageInput = require('./ImageInput');

var _ImageInput2 = _interopRequireDefault(_ImageInput);

var _uploadList = require('./uploadList');

var _uploadList2 = _interopRequireDefault(_uploadList);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    _this.onChange = function (info) {

      _this.setState({
        fileList: info.fileList
      }, function () {
        if (_this.props.onRemove) {
          _this.props.onRemove(info.file);
        }
      });
    };

    _this.handleManualRemove = function (file) {
      file.status = 'removed';
      _this.handleRemove(file);
    };

    _this.state = {
      fileList: _this.props.initialFileList || [],
      // fileList: [],
      initialed: false,
      croppingFileObj: null
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'onFileLoaded',
    value: function onFileLoaded(fileObj) {
      if (this.props.hiddenCropper === true) {
        this.cropImage(fileObj);
      } else {

        this.setState({ croppingFileObj: fileObj });
      }
    }
  }, {
    key: 'cropImage',
    value: function cropImage(fileObj) {
      var targetItem = fileObj;
      var nextFileList = this.state.fileList.concat();

      if (this.props.mode == "avatar") {
        nextFileList = [targetItem];
      } else nextFileList.push(targetItem);

      this.onChange({
        file: targetItem,
        fileList: nextFileList
      });
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      var index = fileList.indexOf(targetItem);
      if (index !== -1) {
        fileList.splice(index, 1);
        return fileList;
      }
      return null;
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove(file) {
      var fileList = this.removeFile(file);
      if (fileList) {
        this.onChange({
          file: file,
          fileList: fileList
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (nextProps.initialFileList && Array.isArray(nextProps.initialFileList) && nextProps.initialFileList.length == 1) {
        if (nextProps.initialFileList[0].src) this.setState({
          fileList: nextProps.initialFileList
        });
      }
    }
  }, {
    key: 'getUploadList',
    value: function getUploadList() {
      var uploadList = void 0;
      if (this.props.showUploadList && this.state.fileList.length > 0) {
        uploadList = _react2.default.createElement(_uploadList2.default, {
          multi: false,
          preview: this.props.viewOnly,
          items: this.state.fileList,
          onRemove: this.handleManualRemove,
          aspectRatio: this.props.aspectRatio,
          width: this.props.width,
          styles: {
            marginRight: 0
          }
        });
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
      var type = this.props.type || 'select';

      var _props = this.props,
          cropper = _props.cropper,
          viewOnly = _props.viewOnly,
          width = _props.width,
          height = _props.height,
          props = _objectWithoutProperties(_props, ['cropper', 'viewOnly', 'width', 'height']);

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
        { className: 'upload-input-avatar', style: { position: 'relative', height: height, width: width } },
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
  type: 'select',
  multiple: false,
  onChange: noop,
  showUploadList: true,
  listType: 'pictrue',
  className: '',
  aspectRatio: 4 / 3,
  cropQuality: 0.9,
  width: 96,
  mode: "avatar"
};
exports.default = Upload;