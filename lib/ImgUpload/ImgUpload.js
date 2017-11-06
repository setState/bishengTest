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

var _antd = require('antd');

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

// 新增一个 props.maxSize: React.PropTypes.number 控制文件大小
//props.maxLength: React.PropTypes.number 控制文件个数


var Upload = function (_React$Component) {
  _inherits(Upload, _React$Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this.onChange = function (info) {

      if (_this.props.onChangeBefore && _this.props.onChangeBefore(info.file, info.fileList) === false) {

        return;
      }

      if (info.file.status !== 'removed' && info.file.file.size / 1024 / 1024 >= _this.props.maxSize) {
        _antd.message.error('\u56FE\u7247\u5FC5\u987B\u5C0F\u4E8E ' + _this.props.maxSize + 'MB!');
        return;
      }

      var updateStatus = {
        fileList: info.fileList,
        uploadEnable: true
      };

      if (_this.props.maxLength > 0 && info.fileList.length >= _this.props.maxLength) updateStatus.uploadEnable = false;

      _this.setState(updateStatus, function () {

        if (_this.props.onChange) {
          _this.props.onChange(info.file, info.fileList);
        }
      });
    };

    _this.handleManualRemove = function (file) {

      file.status = 'removed';

      _this.handleRemove(file);

      if (_this.props.onRemove) {

        _this.props.onRemove(file);
      }
    };

    _this.state = {
      fileList: _this.props.initialFileList || _this.props.defaultFileList || [],
      // fileList: [],
      initialed: false,
      croppingFileObj: null,
      uploadEnable: true
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
      if (this.props.showUploadList === false) {
        //不显示图片列表的情况下，清空列表
        nextFileList = [];
      }
      if (this.props.maxLength && !(0, _isNaN2.default)(this.props.maxLength) && nextFileList.length == this.props.maxLength) {
        nextFileList.pop();
      }
      nextFileList.push(targetItem);
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

      if (!this.state.initialed && nextProps.initialFileList && Array.isArray(nextProps.initialFileList) && nextProps.initialFileList.length) {
        var updateState = {
          initialed: true,
          fileList: nextProps.initialFileList,
          uploadEnable: true
        };

        if (nextProps.maxLength > 0 && nextProps.initialFileList.length >= nextProps.maxLength) updateState.uploadEnable = false;

        this.setState(updateState);
      }
    }
  }, {
    key: 'getUploadList',
    value: function getUploadList() {
      var uploadList = void 0;
      if (this.props.showUploadList && this.state.fileList.length > 0) {
        uploadList = _react2.default.createElement(_uploadList2.default, {
          preview: this.props.viewOnly,
          listType: this.props.listType,
          items: this.state.fileList,
          onRemove: this.handleManualRemove,
          aspectRatio: this.props.aspectRatio,
          width: this.props.width
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

      var thumbnailWidth = 96 * aspectRatio;

      return {
        ratio: aspectRatioNum,
        width: thumbnailWidth
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var type = this.props.type || 'select';

      var _props = this.props,
          cropper = _props.cropper,
          props = _objectWithoutProperties(_props, ['cropper']);

      var inputProps = _extends({}, props, {
        onFileLoaded: this.onFileLoaded.bind(this)
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
        { style: { position: 'relative' } },
        _react2.default.createElement(
          'span',
          { style: { display: 'flex' } },
          uploadList,
          _react2.default.createElement(
            _ImageInput2.default,
            _extends({ ref: 'imageInput' }, inputProps),
            this.state.uploadEnable ? this.props.children : null
          ),
          _react2.default.createElement(_ImageCropper2.default, cropperProps)
        )
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
    key: 'reset',
    value: function reset() {
      this.setState({ initialed: false });
    }
  }, {
    key: 'removeAllFiles',
    value: function removeAllFiles() {
      this.setState({ fileList: [] });
    }
  }, {
    key: 'open',
    value: function open() {
      this.refs.imageInput.onClick();
    }
  }]);

  return Upload;
}(_react2.default.Component);

Upload.defaultProps = {
  type: 'select',
  multiple: false,
  onChange: noop,
  onRemove: noop,
  showUploadList: true,
  listType: 'pictrue',
  className: '',
  aspectRatio: 4 / 3,
  cropQuality: 0.9,
  width: 104
};
exports.default = Upload;