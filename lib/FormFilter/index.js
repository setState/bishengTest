'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _antd = require('antd');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createForm = _antd.Form.create;

var defaultPrefixCls = "form-filter";
var globalMarginBottom = "12px";

function generator(props) {
  return function (Basic) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
      _inherits(Adapter, _React$Component);

      function Adapter() {
        _classCallCheck(this, Adapter);

        return _possibleConstructorReturn(this, (Adapter.__proto__ || Object.getPrototypeOf(Adapter)).apply(this, arguments));
      }

      _createClass(Adapter, [{
        key: 'render',
        value: function render() {
          var prefixCls = props.prefixCls;

          return _react2.default.createElement(Basic, _extends({ prefixCls: prefixCls, name: props.name }, this.props));
        }
      }]);

      return Adapter;
    }(_react2.default.Component), _class.propTypes = {
      name: _react.PropTypes.string.isRequired
    }, _class.defaultProps = {
      name: props.name
    }, _temp;
  };
}

var Basic = _react2.default.createClass({
  displayName: 'Basic',
  render: function render() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        children = _props.children,
        name = _props.name,
        others = _objectWithoutProperties(_props, ['prefixCls', 'className', 'children', 'name']);

    var divCls = (0, _classnames2.default)(className, prefixCls);

    return _react2.default.createElement(
      'div',
      _extends({ className: divCls }, others),
      children
    );
  }
});

var FormFilter = createForm()(_react2.default.createClass({
  displayName: 'FormFilter',

  propTypes: {
    style: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    className: _react.PropTypes.string,
    name: _react.PropTypes.string,
    onSubmit: _react.PropTypes.func.isRequired,
    onToggleChange: _react.PropTypes.func,
    expand: _react.PropTypes.bool,
    loading: _react.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: "FormFilter",
      prefixCls: defaultPrefixCls,
      loading: false
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;

    var expand = void 0;
    if ('expand' in props) {
      expand = props.expand;
    }

    return {
      expand: expand,
      submitting: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('expand' in nextProps) {
      this.setState({
        expand: nextProps.expand || false
      });
    }
  },
  toggle: function toggle() {
    if (!('expand' in this.props)) {
      this.setState({ expand: !this.state.expand });
    }

    this.props.onToggleChange && this.props.onToggleChange(!this.state.expand);
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e);
  },
  handleReset: function handleReset(e) {
    this.props.onReset(e);
  },
  render: function render() {
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        className = _props2.className,
        children = _props2.children,
        name = _props2.name,
        loading = _props2.loading,
        wrappedComponentRef = _props2.wrappedComponentRef,
        others = _objectWithoutProperties(_props2, ['prefixCls', 'className', 'children', 'name', 'loading', 'wrappedComponentRef']);

    var Condition = void 0,
        AdvancedCondition = void 0,
        SearchBox = void 0;

    _react2.default.Children.forEach(children, function (ele) {
      if (ele && ele.props && ele.props.name) {
        switch (ele.props.name) {
          case "Condition":
            Condition = ele;
            break;
          case "AdvancedCondition":
            AdvancedCondition = ele;
            break;
          case "SearchBox":
            SearchBox = ele;
            break;
        }
      }
    });

    var divCls = (0, _classnames2.default)(className, prefixCls);
    return _react2.default.createElement(
      'div',
      _extends({ className: divCls }, others),
      _react2.default.createElement(
        _antd.Form,
        null,
        _react2.default.createElement(
          _antd.Row,
          null,
          _react2.default.createElement(
            _antd.Col,
            { span: 21 },
            Condition
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 3, style: { textAlign: 'right', marginBottom: globalMarginBottom } },
            _react2.default.createElement(
              _antd.Button,
              { size: 'large', type: 'primary',
                style: { width: "65px" },
                loading: loading,
                onClick: this.handleSubmit
              },
              '\u67E5\u8BE2'
            ),
            AdvancedCondition ? _react2.default.createElement(
              'a',
              { style: { marginLeft: 12, marginRight: -12, fontSize: 12 }, onClick: this.toggle },
              _react2.default.createElement(_antd.Icon, { type: this.state.expand ? 'up' : 'down' })
            ) : null
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          null,
          _react2.default.createElement(
            _antd.Col,
            { span: 21 },
            this.state.expand ? AdvancedCondition : null
          ),
          _react2.default.createElement(_antd.Col, { span: 3 })
        )
      )
    );
  }
}));

var AdvancedCondition = generator({
  prefixCls: defaultPrefixCls + '-advanced-condition',
  name: 'AdvancedCondition'
})(Basic);

var Condition = generator({
  prefixCls: defaultPrefixCls + '-condition',
  name: 'Condition'
})(Basic);

var SearchBox = generator({
  prefixCls: defaultPrefixCls + '-search-box',
  name: 'SearchBox'
})(Basic);

FormFilter.Condition = Condition;
FormFilter.AdvancedCondition = AdvancedCondition;
FormFilter.SearchBox = SearchBox;

exports.default = FormFilter;