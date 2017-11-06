'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/*import Icon from 'react-fa';*/


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _elementClass = require('../element-class');

var _elementClass2 = _interopRequireDefault(_elementClass);

var _antd = require('antd');

require('./style.css');

var _tabs = require('antd/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TabPane = _tabs2.default.TabPane;

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    outline: 'none',
    padding: '0px',
    minWidth: '700px',
    transform: 'translate(-50%,-50%)'
  },
  contentLimit: {}
};

var PanelModal = (0, _createReactClass2.default)({
  displayName: 'PanelModal',

  getDefaultProps: function getDefaultProps() {
    return {
      tabs: [],
      shouldCloseOnOverlayClick: true, // 点击遮罩，是否关闭浮窗；true:关闭，false:不关闭
      contentLabel: "tab-modal"
    };
  },
  getInitialState: function getInitialState() {
    return {
      isOpen: false
    };
  },
  whichStyle: function whichStyle() {
    var customStylesProp = this.props.customStyles || {};
    var style = this.props.style || {};

    var contentStyle = _extends({}, customStyles.content, style, customStylesProp.content);

    var contentLimitStyle = _extends({}, customStyles.contentLimit, customStylesProp.contentLimit);

    return {
      content: contentStyle,
      contentLimit: contentLimitStyle
    };
  },
  getBodyStyle: function getBodyStyle() {
    if (this.props.customStyles && this.props.customStyles.contentLimit) return this.props.customStyles.contentLimit;else return customStyles.contentLimit;
  },
  onTabChangeHandler: function onTabChangeHandler(key) {
    this.props.onTabChange && this.props.onTabChange(key);
  },
  renderContent: function renderContent(title, tabs, content, padding, props) {
    var result = null,
        tabEles = [],
        style = padding ? { padding: '24px' } : {};

    if (tabs && Array.isArray(tabs) && tabs.length > 0) {
      tabs.forEach(function (val, index) {
        return tabEles.push(_react2.default.createElement(
          TabPane,
          _extends({ tab: val.title, key: 'tab' + index,
            disabled: val.disabled ? true : false }, props),
          _react2.default.createElement(
            'div',
            { style: style },
            val.content || ''
          )
        ));
      });
      if (title) {
        result = _react2.default.createElement(
          'div',
          { className: 'card-container' },
          _react2.default.createElement(
            _tabs2.default,
            _extends({ onChange: this.onTabChangeHandler, type: 'card' }, props),
            tabEles
          )
        );
      } else {
        result = _react2.default.createElement(
          'div',
          { className: 'card-container' },
          _react2.default.createElement(
            'a',
            { onClick: this.props.closeModal, className: 'tab-modal-close' },
            _react2.default.createElement(_antd.Icon, { type: 'close' })
          ),
          _react2.default.createElement(
            _tabs2.default,
            { onChange: this.onTabChangeHandler, type: 'card', destroyInactiveTabPane: true },
            tabEles
          )
        );
      }
    } else {
      if (content) {
        result = _react2.default.createElement(
          'div',
          { className: 'card-container', style: { marginTop: '16px', borderTop: '1px solid #eaeaea' } },
          content
        );
      }
    }
    return result;
  },
  renderChildren: function renderChildren(isNeed) {
    var result = '';
    if (isNeed) {
      result = this.props.children;
    }
    return result;
  },
  checkScrollBar: function checkScrollBar() {
    //true 有滚动条
    var flag = document.body.scrollHeight > document.body.clientHeight;
    if (flag) (0, _elementClass2.default)(document.body).add('ReactModal__Body--lock');else (0, _elementClass2.default)(document.body).remove('ReactModal__Body--lock');
  },
  afterOpenModal: function afterOpenModal() {
    (0, _elementClass2.default)(document.body).add('ReactModal__Body--open');
  },
  closeModal: function closeModal() {
    if (this.props.isOpen === undefined) this.setModal(false);

    if (this.props.closeModal) this.props.closeModal();
  },
  setModal: function setModal(flag) {
    this.setState({ isOpen: flag == true });
  },
  render: function render() {
    var _props = this.props,
        customStyles = _props.customStyles,
        style = _props.style,
        title = _props.title,
        tabs = _props.tabs,
        content = _props.content,
        isOpen = _props.isOpen,
        _props$padding = _props.padding,
        padding = _props$padding === undefined ? true : _props$padding,
        destroyInactiveTabPane = _props.destroyInactiveTabPane,
        others = _objectWithoutProperties(_props, ['customStyles', 'style', 'title', 'tabs', 'content', 'isOpen', 'padding', 'destroyInactiveTabPane']);

    if (isOpen === undefined) isOpen = this.state.isOpen;

    this.checkScrollBar();

    return _react2.default.createElement(
      _reactModal2.default,
      _extends({
        onAfterOpen: this.afterOpenModal,
        isOpen: isOpen,
        onRequestClose: this.closeModal
      }, others, {
        style: this.whichStyle() }),
      _react2.default.createElement(
        'div',
        { className: 'modal-me' },
        _react2.default.createElement(
          'div',
          { className: 'tab-cm-modal-content' },
          !title ? null : _react2.default.createElement(
            'div',
            { className: 'tab-cm-modal-title' },
            _react2.default.createElement(
              'p',
              null,
              title
            ),
            _react2.default.createElement(
              'a',
              { onClick: this.props.closeModal, className: 'tab-modal-close', style: { padding: '16px 16px' } },
              _react2.default.createElement(_antd.Icon, { name: 'times' })
            )
          ),
          this.renderContent(title, tabs, content, padding, {
            destroyInactiveTabPane: destroyInactiveTabPane
          }),
          _react2.default.createElement(
            'div',
            { className: 'tab-cm-modal-body', id: this.props.id, style: this.getBodyStyle() },
            this.renderChildren(!tabs || !Array.isArray(tabs) || tabs.length == 0)
          )
        )
      )
    );
  }
});

exports.default = PanelModal;