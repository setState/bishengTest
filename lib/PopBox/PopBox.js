'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by neo on 16/4/22.
                                                                                                                                                                                                                              */


var noop = function noop() {};

var PopBox = (0, _createReactClass2.default)({
  displayName: 'PopBox',

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: noop,
      getTooltipContainer: function getTooltipContainer() {
        return document.getElementById("main-content");
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },
  hide: function hide() {
    this.setState({
      visible: false
    });
    var self = this;
    process.nextTick(this.handleVisibleChange.bind(self, false));
  },
  handleVisibleChange: function handleVisibleChange(visible) {
    this.setState({ visible: visible });
    this.props.onChange(visible);
  },
  render: function render() {
    var _props = this.props,
        children = _props.children,
        visible = _props.visible,
        other = _objectWithoutProperties(_props, ['children', 'visible']);

    return _react2.default.createElement(
      _antd.Popover,
      _extends({}, other, {
        visible: this.state.visible,
        onVisibleChange: this.handleVisibleChange
      }),
      children
    );
  }
});

exports.default = PopBox;