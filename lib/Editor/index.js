'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _wangeditor = require('wangeditor');

var _wangeditor2 = _interopRequireDefault(_wangeditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.onEditorChange = function () {
      _this.props.onChange && _this.props.onChange(_this.__editor__.$txt.html());
    };

    _this.html = function () {
      return _this.__editor__.$txt.html();
    };

    _this.clear = function () {
      _this.__editor__.$txt.html('<p><br></p>');
    };

    _this.images = function () {
      return _this.__editor__.$txt.find('img');
    };

    _this.disable = function () {
      _this.__editor__.disable();
    };

    _this.enable = function () {
      _this.__editor__.enable();
    };

    return _this;
  }

  _createClass(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.__editor__ = new _wangeditor2.default('editor-trigger');
      this.__editor__.onchange = this.onEditorChange;
      // config
      // close log
      this.__editor__.config.printLog = false;
      // menu
      this.__editor__.config.menus = this.props.menus;
      // color ：可以自定义颜色，后期需要确定系统中的颜色，要求Design给出颜色后，可以配置
      // editor.config.colors = { "#ffffff": "白色", "#000000": "黑色"}

      // 图片上传配置，需要后台支持，参考  http://www.kancloud.cn/wangfupeng/wangeditor2/113992
      // this.__editor__.config.uploadImgUrl = this.props.uploadImgUrl
      // this.__editor__.config.uploadParams = this.props.uploadParams
      // this.__editor__.config.uploadHeaders = this.props.uploadHeaders

      // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
      // editor.config.hideLinkImg = true;

      // 约定
      // 上传成功后，server 端需要返回（即：response）图片的 url 地址，例如：
      // "http://xxx.com/imgs/abc.png"


      this.__editor__.create();

      // init
      if (this.props.initValue) {
        this.__editor__.$txt.html(this.props.initValue);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.__editor__.destroy();
      this.__editor__ = null;
      delete this.__editor__;
    }
  }, {
    key: 'render',
    value: function render() {
      var height = this.props.height;

      return _react2.default.createElement(
        'div',
        { style: { padding: '2em' }, className: 'editor-trigger-container-class' },
        _react2.default.createElement('div', { id: 'editor-trigger', style: { height: height } })
      );
    }

    // api

  }]);

  return Editor;
}(_react.Component);

Editor.propTypes = {
  onChange: _react.PropTypes.func,
  initValue: _react.PropTypes.string,
  menus: _react.PropTypes.array,
  uploadImgUrl: _react.PropTypes.string, // 文件上传 url
  uploadParams: _react.PropTypes.object, // 文件上传所需参数
  uploadHeaders: _react.PropTypes.object, // 文件上传所需HTTP头部
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]) // 文件上传所需HTTP头部
};
Editor.defaultProps = {
  menus: ["|", "bold", "underline", "italic", "strikethrough", "eraser", "forecolor", "bgcolor", "|", "quote", "fontfamily", "fontsize", "head", "unorderlist", "orderlist", "alignleft", "aligncenter", "alignright", "|", "link", "unlink", "table", "|", "img", "video", "|", "undo", "redo", "fullscreen"],
  height: 200
};
exports.default = Editor;