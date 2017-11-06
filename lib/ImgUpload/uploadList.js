'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _Gallery = require('../Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  marginRight: '10px'
};

var UploadList = function (_React$Component) {
  _inherits(UploadList, _React$Component);

  function UploadList() {
    _classCallCheck(this, UploadList);

    return _possibleConstructorReturn(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).apply(this, arguments));
  }

  _createClass(UploadList, [{
    key: 'handleImageRemove',
    value: function handleImageRemove(img) {
      var arr = [];
      if (this.props.items) {
        arr = this.props.items.filter(function (file) {
          return file.key == img.id;
        });
      }

      this.props.onRemove && this.props.onRemove(arr[0]);
    }
  }, {
    key: 'renderGallery',
    value: function renderGallery() {
      var images = [];

      if (this.props.items) {
        images = this.props.items.map(function (file) {
          return {
            id: file.key,
            src: file.src,
            title: file.title
          };
        });
      }

      return images;
    }
  }, {
    key: 'renderGallerBox',
    value: function renderGallerBox() {

      return _react2.default.createElement(_Gallery2.default, { preview: this.props.preview || false, onImageRemove: this.handleImageRemove.bind(this),
        images: this.renderGallery(), thumbnailStyle: this.getSize() });
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      var aspectRatio = 1;

      if (this.props.aspectRatio && !(0, _isNaN2.default)(this.props.aspectRatio)) {

        aspectRatio = this.props.aspectRatio;
      }

      var thumbnailHeight = this.props.width / aspectRatio;

      var thumbnailStyle = {
        height: Math.floor(thumbnailHeight),
        width: this.props.width
      };

      return thumbnailStyle;
    }
  }, {
    key: 'getSingleImg',
    value: function getSingleImg() {
      var image = "";

      if (this.props.items && this.props.items.length >= 0) {
        image = this.props.items[0].src;
      }

      return _react2.default.createElement('img', { className: 'upload-input-img', style: this.getSize(), src: image, alt: '' });
    }
  }, {
    key: 'renderImg',
    value: function renderImg() {
      if (this.props.multi) return this.renderGallerBox();else return this.getSingleImg();
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { style: (0, _objectAssign2.default)({}, styles, this.props.styles) },
        this.renderImg()
      );
    }
  }]);

  return UploadList;
}(_react2.default.Component);

UploadList.defaultProps = {
  listType: 'picture', // or text
  items: [],
  progressAttr: {
    strokeWidth: 3,
    showInfo: false
  },
  multi: true,
  styles: {}
};
exports.default = UploadList;