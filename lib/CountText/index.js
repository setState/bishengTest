'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by neo on 15/11/5.
                                                                                                                                                                                                                              */


var CountText = _react2.default.createClass({
  displayName: 'CountText',

  remainingCharacters: function remainingCharacters() {
    if (this.props.value) return this.props.maxLength - this.props.value.length;else return this.props.maxLength;
  },
  onChange: function onChange(e) {
    var _props = this.props,
        value = _props.value,
        maxLength = _props.maxLength,
        onChange = _props.onChange;


    if (e.target.value.length <= maxLength) onChange && onChange(e.target.value);else onChange && onChange(e.target.value.substr(0, maxLength));
  },

  render: function render() {
    var _props2 = this.props,
        textStyle = _props2.textStyle,
        onChange = _props2.onChange,
        maxLength = _props2.maxLength,
        type = _props2.type,
        placeholder = _props2.placeholder,
        other = _objectWithoutProperties(_props2, ['textStyle', 'onChange', 'maxLength', 'type', 'placeholder']);

    return _react2.default.createElement(
      'div',
      { className: 'countText' },
      _react2.default.createElement(_antd.Input, _extends({}, other, {
        type: 'textarea',
        style: textStyle,
        onChange: this.onChange,
        placeholder: placeholder || '\u8BF7\u8F93\u5165\u6587\u5B57,\u5B57\u6570\u4E0D\u80FD\u8D85\u8FC7' + maxLength + '\u4E2A'
      })),
      _react2.default.createElement(
        'p',
        { style: { marginTop: "-6px" } },
        '\u5269\u4F59',
        this.remainingCharacters(),
        '\u5B57'
      )
    );
  }
});

CountText.propTypes = {
  maxLength: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  textStyle: _react2.default.PropTypes.object
  //value: React.PropTypes.string
};

CountText.defaultProps = {
  maxLength: 200,
  textStyle: {}
  //value: ''
};

exports.default = CountText;