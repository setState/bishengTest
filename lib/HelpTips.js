'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _component = require('component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by neo on 16/5/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    border: 'none',
    padding: 0,
    width: '700px'
  }
};

var HelpTips = function (_React$Component) {
  _inherits(HelpTips, _React$Component);

  function HelpTips(props) {
    _classCallCheck(this, HelpTips);

    var _this = _possibleConstructorReturn(this, (HelpTips.__proto__ || Object.getPrototypeOf(HelpTips)).call(this, props));

    _this.toggleModal = function () {
      _this.setState({ open: !_this.state.open });
    };

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(HelpTips, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          children = _props.children,
          className = _props.className,
          customStyles = _props.customStyles;


      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'a',
          { onClick: this.toggleModal },
          '\u5E2E\u52A9?'
        ),
        _react2.default.createElement(
          _component.PanelModal,
          {
            isOpen: this.state.open,
            closeModal: this.toggleModal,
            title: title || "帮助",
            customStyles: customStyles || cStyles },
          children
        )
      );
    }
  }]);

  return HelpTips;
}(_react2.default.Component);

exports.default = HelpTips;