'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by neo on 16/4/22.
                                                                                                                                                                                                                              */


var prefix = 'table-filter-';

var FilterItem = (0, _createReactClass2.default)({
  displayName: 'FilterItem',
  render: function render() {
    var _classNames;

    var props = this.props;

    var label = props.label,
        style = props.style,
        className = props.className,
        float = props.float,
        children = props.children,
        others = _objectWithoutProperties(props, ['label', 'style', 'className', 'float', 'children']);

    var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, prefix + 'item', true), _defineProperty(_classNames, '' + prefix + float + '-item', float), _defineProperty(_classNames, className, className), _classNames));

    if (!label) {

      return _react2.default.createElement(
        'div',
        _extends({}, others, {
          style: style,
          className: classes }),
        children
      );
    } else {
      style.display = 'flex';
      return _react2.default.createElement(
        'div',
        _extends({}, others, {
          style: style,
          className: classes }),
        _react2.default.createElement(
          'div',
          { style: { lineHeight: 2 } },
          label
        ),
        children
      );
    }
  }
});

exports.default = FilterItem;