'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./submit-group-large.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefix = 'submit-group-space';

var SubmitGroupLarge = function (_React$Component) {
  _inherits(SubmitGroupLarge, _React$Component);

  function SubmitGroupLarge() {
    _classCallCheck(this, SubmitGroupLarge);

    return _possibleConstructorReturn(this, (SubmitGroupLarge.__proto__ || Object.getPrototypeOf(SubmitGroupLarge)).apply(this, arguments));
  }

  _createClass(SubmitGroupLarge, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          cancelTxt = _props.cancelTxt,
          confirmTxt = _props.confirmTxt,
          className = _props.className,
          cancelClick = _props.cancelClick,
          confirmClick = _props.confirmClick,
          others = _objectWithoutProperties(_props, ['cancelTxt', 'confirmTxt', 'className', 'cancelClick', 'confirmClick']);

      var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, prefix, true), _defineProperty(_classNames, className, className), _classNames));

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _antd.Button,
          _extends({}, others, { onClick: cancelClick }),
          cancelTxt
        ),
        _react2.default.createElement(
          _button2.default,
          _extends({}, others, { onClick: confirmClick, promise: true,
            type: 'primary' }),
          confirmTxt
        )
      );
    }
  }]);

  return SubmitGroupLarge;
}(_react2.default.Component);

SubmitGroupLarge.defaultProps = {
  cancelClick: function cancelClick() {},
  confirmClick: function confirmClick() {},
  cancelTxt: '返回',
  confirmTxt: '确定',
  size: 'large'
};
exports.default = SubmitGroupLarge;