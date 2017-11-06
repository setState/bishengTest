'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _antd = require('antd');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

require('./PanelModal.css');

var _elementClass = require('../element-class');

var _elementClass2 = _interopRequireDefault(_elementClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by neo on 15/10/30.
                                                                                                                                                                                                                              */

/*import Icon from 'react-fa';*/


var customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    border: 'none',
    padding: 0,
    width: '500px'
  },
  contentLimit: {}
};

var PanelModal = (0, _createReactClass2.default)({
  displayName: 'PanelModal',

  propTypes: {
    containerClass: _propTypes2.default.string,
    maskClosable: _propTypes2.default.bool,
    closable: _propTypes2.default.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      containerClass: "cm-modal-container",
      contentLabel: "panel-modal",
      shouldCloseOnOverlayClick: true,
      maskClosable: true, // overlay遮罩层是否能点击关闭，不建议使用shouldCloseOnOverlayClick属性。
      closable: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      isOpen: false
    };
  },
  componentDidMount: function componentDidMount() {
    // this.checkScrollBar();
  },
  checkScrollBar: function checkScrollBar() {
    //true 有滚动条
    var flag = document.body.scrollHeight > document.body.clientHeight;
    if (flag) (0, _elementClass2.default)(document.body).add('ReactModal__Body--lock');else (0, _elementClass2.default)(document.body).remove('ReactModal__Body--lock');
  },
  whichStyle: function whichStyle() {
    if (this.props.customStyles) return this.props.customStyles;else return customStyles;
  },
  setModal: function setModal(flag) {
    this.setState({ isOpen: flag == true });
  },
  closeModal: function closeModal() {
    if (this.props.isOpen === undefined) this.setModal(false);

    if (this.props.closeModal) this.props.closeModal();
  },
  getBodyStyle: function getBodyStyle() {
    if (this.props.customStyles && this.props.customStyles.contentLimit) return this.props.customStyles.contentLimit;else return customStyles.contentLimit;
  },
  afterOpenModal: function afterOpenModal() {
    (0, _elementClass2.default)(document.body).add('ReactModal__Body--open');
  },
  getCloseIcon: function getCloseIcon() {
    if (this.props.hasOwnProperty('closable') && !this.props.closable) {
      return '';
    } else {
      return _react2.default.createElement(
        'a',
        { onClick: this.closeModal, className: 'close' },
        _react2.default.createElement(_antd.Icon, { type: 'close' })
      );
    }
  },
  render: function render() {
    var _props = this.props,
        isOpen = _props.isOpen,
        title = _props.title,
        id = _props.id,
        children = _props.children,
        nesting = _props.nesting,
        containerClass = _props.containerClass,
        customStyles = _props.customStyles,
        shouldCloseOnOverlayClick = _props.shouldCloseOnOverlayClick,
        maskClosable = _props.maskClosable,
        other = _objectWithoutProperties(_props, ['isOpen', 'title', 'id', 'children', 'nesting', 'containerClass', 'customStyles', 'shouldCloseOnOverlayClick', 'maskClosable']);

    if (isOpen === undefined) isOpen = this.state.isOpen;

    this.checkScrollBar();

    var classes = (0, _classnames2.default)(_defineProperty({
      "cm-modal-dialog": true
    }, containerClass, true));

    shouldCloseOnOverlayClick = maskClosable;

    return _react2.default.createElement(
      _reactModal2.default,
      _extends({
        onAfterOpen: this.afterOpenModal,
        isOpen: isOpen,
        nesting: nesting,
        shouldCloseOnOverlayClick: shouldCloseOnOverlayClick,
        onRequestClose: this.closeModal,
        style: this.whichStyle()
      }, other),
      _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'cm-modal-content' },
          _react2.default.createElement(
            'div',
            { className: 'cm-modal-header' },
            this.getCloseIcon(),
            _react2.default.createElement(
              'h4',
              { className: 'cm-modal-title', style: { textAlign: "center" } },
              title ? title : "标题"
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'cm-modal-body', id: id, style: this.getBodyStyle() },
            children
          )
        )
      )
    );
  }
});

exports.default = PanelModal;