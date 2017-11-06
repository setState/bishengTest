'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _createReactClass2.default)({
  displayName: 'Portal',
  portalElement: null,
  render: function render() {
    return null;
  },
  componentDidMount: function componentDidMount() {
    var p = document.createElement('div');
    document.body.appendChild(p);
    this.portalElement = p;
    this.componentDidUpdate();
  },
  componentWillUnmount: function componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  },
  componentDidUpdate: function componentDidUpdate() {
    (0, _reactDom.render)(_react2.default.createElement(
      'div',
      this.props,
      this.props.children
    ), this.portalElement);
  }
});