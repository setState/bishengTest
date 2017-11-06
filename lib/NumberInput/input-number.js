'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// depend on ant input-number style

function noop() {}

function preventDefault(e) {
  e.preventDefault();
}

var InputNumber = (0, _createReactClass2.default)({
  displayName: 'InputNumber',

  propTypes: {
    onChange: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    readOnly: _propTypes2.default.bool,
    max: _propTypes2.default.number,
    min: _propTypes2.default.number,
    step: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  },

  mixins: [_mixin2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'number-input'
    };
  },
  componentDidMount: function componentDidMount() {
    this.componentDidUpdate();
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.focused && document.activeElement !== this.refs.input) {
      this.refs.input.focus();
    }
  },
  onKeyDown: function onKeyDown(e) {
    var _props;

    if (e.keyCode === 38) {
      this.up(e);
    } else if (e.keyCode === 40) {
      this.down(e);
    }

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_props = this.props).onKeyDown.apply(_props, [e].concat(args));
  },
  getValueFromEvent: function getValueFromEvent(e) {
    return e.target.value;
  },
  focus: function focus() {
    this.refs.input.focus();
  },
  render: function render() {
    var _classNames;

    var props = _extends({}, this.props);
    var prefixCls = props.prefixCls;
    var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, prefixCls + '-disabled', props.disabled), _defineProperty(_classNames, prefixCls + '-focused', this.state.focused), _classNames));
    var upDisabledClass = '';
    var downDisabledClass = '';
    var value = this.state.value;
    if (!isNaN(value)) {
      var val = Number(value);
      if (val >= props.max) {
        upDisabledClass = prefixCls + '-handler-up-disabled';
      }
      if (val <= props.min) {
        downDisabledClass = prefixCls + '-handler-down-disabled';
      }
    } else {
      upDisabledClass = prefixCls + '-handler-up-disabled';
      downDisabledClass = prefixCls + '-handler-down-disabled';
    }

    var editable = !props.readOnly && !props.disabled;

    // focus state, show input value
    // unfocus state, show valid value
    var inputDisplayValue = void 0;
    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.state.value;
    }

    if (inputDisplayValue === undefined) {
      inputDisplayValue = '';
    }

    // Remove React warning.
    // Warning: Input elements must be either controlled
    // or uncontrolled (specify either the value prop, or
    // the defaultValue prop, but not both).
    delete props.defaultValue;
    // https://fb.me/react-unknown-prop
    delete props.prefixCls;

    // ref for test
    return _react2.default.createElement(
      'div',
      { className: classes, style: props.style },
      _react2.default.createElement('input', _extends({}, props, {
        style: null,
        className: prefixCls + '-input',
        autoComplete: 'off',
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        autoFocus: props.autoFocus,
        readOnly: props.readOnly,
        disabled: props.disabled,
        max: props.max,
        min: props.min,
        name: props.name,
        onChange: this.onChange,
        ref: 'input',
        value: inputDisplayValue,
        type: 'text'
      }))
    );
  }
});

exports.default = InputNumber;