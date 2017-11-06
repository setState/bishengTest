'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = _antd.Button.Group;
var InputGroup = _antd.Input.Group;


var FilterType = {
  YEAR: 'MM',
  MONTH: 'dd',
  DAY: 'HH',
  ALL: 'yyyy'
};

var DateFilter = function (_Component) {
  _inherits(DateFilter, _Component);

  function DateFilter(props) {
    _classCallCheck(this, DateFilter);

    var _this = _possibleConstructorReturn(this, (DateFilter.__proto__ || Object.getPrototypeOf(DateFilter)).call(this, props));

    var _this$props = _this.props,
        defaultType = _this$props.defaultType,
        defaultValue = _this$props.defaultValue,
        disabledAllBtn = _this$props.disabledAllBtn;

    var _this$getPreNextDisab = _this.getPreNextDisabled(defaultType, defaultValue),
        preDisabled = _this$getPreNextDisab.preDisabled,
        nextDisabled = _this$getPreNextDisab.nextDisabled;

    _this.state = {
      type: defaultType,
      value: new Date(defaultValue),
      preDisabled: preDisabled,
      nextDisabled: nextDisabled,
      disabledAllBtn: disabledAllBtn
    };
    return _this;
  }

  _createClass(DateFilter, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var disabledAllBtn = nextProps.disabledAllBtn;

      if (disabledAllBtn !== this.props.disabledAllBtn) {
        this.setState({ disabledAllBtn: disabledAllBtn });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          hasDay = _props.hasDay,
          hasAll = _props.hasAll,
          hasYear = _props.hasYear;
      var _state = this.state,
          preDisabled = _state.preDisabled,
          nextDisabled = _state.nextDisabled,
          disabledAllBtn = _state.disabledAllBtn;


      var formatValue = this.getFormatValue();

      var _getBtnType = this.getBtnType(),
          dayBtnType = _getBtnType.dayBtnType,
          monthBtnType = _getBtnType.monthBtnType,
          yearBtnType = _getBtnType.yearBtnType,
          allBtnType = _getBtnType.allBtnType;

      return _react2.default.createElement(
        'div',
        { className: 'ant-search-input-wrapper', style: style },
        _react2.default.createElement(
          InputGroup,
          { compact: true },
          _react2.default.createElement(_antd.Input, { size: 'large', readOnly: 'readonly', value: formatValue,
            style: { borderTopRightRadius: '0', borderBottomRightRadius: '0', width: "120px", height: "32px" } }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              ButtonGroup,
              { className: 'ant-input-gr oup-wrap', style: { display: 'flex' } },
              _react2.default.createElement(
                _antd.Button,
                { size: 'large', onClick: this.onPreClick.bind(this), disabled: disabledAllBtn || preDisabled,
                  style: { borderTopLeftRadius: '0', borderBottomLeftRadius: '0' } },
                '<<<'
              ),
              hasDay ? _react2.default.createElement(
                _antd.Button,
                { size: 'large', onClick: this.onDayClick.bind(this), disabled: disabledAllBtn,
                  type: dayBtnType },
                '\u65E5'
              ) : null,
              _react2.default.createElement(
                _antd.Button,
                { size: 'large', onClick: this.onMonthClick.bind(this), disabled: disabledAllBtn,
                  type: monthBtnType },
                '\u6708'
              ),
              !!hasYear ? _react2.default.createElement(
                _antd.Button,
                { size: 'large', onClick: this.onYearClick.bind(this), disabled: disabledAllBtn,
                  type: yearBtnType },
                '\u5E74'
              ) : null,
              !!hasAll ? _react2.default.createElement(
                _antd.Button,
                { size: 'large', onClick: this.onAllClick.bind(this), disabled: disabledAllBtn,
                  type: allBtnType },
                '\u6240\u6709'
              ) : null,
              _react2.default.createElement(
                _antd.Button,
                { size: 'large', onClick: this.onNextClick.bind(this),
                  disabled: disabledAllBtn || nextDisabled },
                '>>>'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getBtnType',
    value: function getBtnType() {

      var result = {
        dayBtnType: 'default',
        monthBtnType: 'default',
        yearBtnType: 'default',
        allBtnType: 'default'
      };

      var type = this.state.type;
      var YEAR = FilterType.YEAR,
          MONTH = FilterType.MONTH,
          DAY = FilterType.DAY,
          ALL = FilterType.ALL;


      switch (type) {
        case YEAR:
          result.yearBtnType = 'primary';
          break;
        case MONTH:
          result.monthBtnType = 'primary';
          break;
        case DAY:
          result.dayBtnType = "primary";
          break;
        case ALL:
          result.allBtnType = 'primary';
          break;
      }

      return result;
    }
  }, {
    key: 'getFormatValue',
    value: function getFormatValue() {
      var _state2 = this.state,
          type = _state2.type,
          value = _state2.value;
      var YEAR = FilterType.YEAR,
          MONTH = FilterType.MONTH,
          DAY = FilterType.DAY,
          ALL = FilterType.ALL;


      var result = void 0;

      switch (type) {
        case YEAR:
          result = value.getFullYear() + '\u5E74';
          break;
        case MONTH:
          result = value.getFullYear() + '\u5E74' + (value.getMonth() + 1) + '\u6708';
          break;
        case DAY:
          result = value.getFullYear() + '\u5E74' + (value.getMonth() + 1) + '\u6708' + value.getDate() + '\u65E5';
          break;
        case ALL:
        default:
          result = '历年';
          break;
      }

      return result;
    }
  }, {
    key: 'onPreClick',
    value: function onPreClick() {
      var _state3 = this.state,
          type = _state3.type,
          value = _state3.value;
      var YEAR = FilterType.YEAR,
          MONTH = FilterType.MONTH,
          DAY = FilterType.DAY,
          ALL = FilterType.ALL;
      var minDate = this.props.minDate;


      switch (type) {
        case YEAR:
          if (minDate && value.getFullYear() == minDate.getFullYear()) {
            return;
          }

          value.setFullYear(value.getFullYear() - 1);
          break;
        case MONTH:
          if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth()) {
            return;
          }

          value.setFullYear(value.getFullYear(), value.getMonth() - 1);
          break;
        case DAY:
          if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth() && value.getDate() == minDate.getDate()) {
            return;
          }

          value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() - 1);
          break;
        case ALL:
        default:
          return;
      }

      this.setState({ value: value }, this.didAfterChange);
    }
  }, {
    key: 'onDayClick',
    value: function onDayClick() {

      this.setState({ type: FilterType.DAY, value: new Date() }, this.didAfterChange);
    }
  }, {
    key: 'onMonthClick',
    value: function onMonthClick() {

      this.setState({ type: FilterType.MONTH, value: new Date() }, this.didAfterChange);
    }
  }, {
    key: 'onYearClick',
    value: function onYearClick() {

      this.setState({ type: FilterType.YEAR, value: new Date() }, this.didAfterChange);
    }
  }, {
    key: 'onAllClick',
    value: function onAllClick() {

      this.setState({ type: FilterType.ALL }, this.didAfterChange);
    }
  }, {
    key: 'onNextClick',
    value: function onNextClick() {
      var _state4 = this.state,
          type = _state4.type,
          value = _state4.value;
      var YEAR = FilterType.YEAR,
          MONTH = FilterType.MONTH,
          DAY = FilterType.DAY,
          ALL = FilterType.ALL;
      var maxDate = this.props.maxDate;


      switch (type) {
        case YEAR:
          if (value.getFullYear() == maxDate.getFullYear()) {
            return;
          }
          value.setFullYear(value.getFullYear() + 1);
          break;
        case MONTH:
          if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth()) {
            return;
          }
          value.setFullYear(value.getFullYear(), value.getMonth() + 1);
          break;
        case DAY:
          if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth() && value.getDate() == maxDate.getDate()) {
            return;
          }
          value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() + 1);
          break;
        case ALL:
        default:
          return;
      }

      this.setState({ value: value }, this.didAfterChange);
    }
  }, {
    key: 'didAfterChange',
    value: function didAfterChange() {
      var _state5 = this.state,
          type = _state5.type,
          value = _state5.value;

      var _getPreNextDisabled = this.getPreNextDisabled(type, value),
          preDisabled = _getPreNextDisabled.preDisabled,
          nextDisabled = _getPreNextDisabled.nextDisabled;

      this.setState({
        preDisabled: preDisabled,
        nextDisabled: nextDisabled
      }, this.fireOnChange);
    }
  }, {
    key: 'getPreNextDisabled',
    value: function getPreNextDisabled(type, value) {
      var YEAR = FilterType.YEAR,
          MONTH = FilterType.MONTH,
          DAY = FilterType.DAY,
          ALL = FilterType.ALL;
      var _props2 = this.props,
          maxDate = _props2.maxDate,
          minDate = _props2.minDate;


      var preDisabled = false,
          nextDisabled = false;

      switch (type) {
        case YEAR:
          if (value.getFullYear() == maxDate.getFullYear()) {
            nextDisabled = true;
          }
          if (minDate && value.getFullYear() == minDate.getFullYear()) {
            preDisabled = true;
          }
          break;
        case MONTH:
          if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth()) {
            nextDisabled = true;
          }
          if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth()) {
            preDisabled = true;
          }
          break;
        case DAY:
          if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth() && value.getDate() == maxDate.getDate()) {
            nextDisabled = true;
          }
          if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth() && value.getDate() == minDate.getDate()) {
            preDisabled = true;
          }
          break;
        case ALL:
          preDisabled = true;
          nextDisabled = true;
          break;
        default:
          break;
      }

      return { preDisabled: preDisabled, nextDisabled: nextDisabled };
    }
  }, {
    key: 'fireOnChange',
    value: function fireOnChange() {
      var _state6 = this.state,
          value = _state6.value,
          type = _state6.type;


      this.props.onChange && this.props.onChange(value, type);
    }
  }, {
    key: 'getCurrentInfo',
    value: function getCurrentInfo() {
      var _state7 = this.state,
          type = _state7.type,
          value = _state7.value;


      return { type: type, value: value };
    }
  }, {
    key: 'getMonthRange',
    value: function getMonthRange(date) {
      return {
        firstDay: (0, _moment2.default)(date).startOf('month').toDate(),
        lastDay: (0, _moment2.default)(date).endOf('month').toDate()
      };
    }
  }, {
    key: 'getDayRange',
    value: function getDayRange(date) {
      return {
        firstDay: date,
        lastDay: date
      };
    }
  }, {
    key: 'getRangeDate',
    value: function getRangeDate() {
      var _state8 = this.state,
          type = _state8.type,
          value = _state8.value;


      if (FilterType.MONTH == type) return this.getMonthRange(value);else if (FilterType.DAY == type) return this.getDayRange(value);else return false;
    }
  }]);

  return DateFilter;
}(_react.Component);

DateFilter.FilterType = FilterType;
DateFilter.defaultProps = {
  defaultType: FilterType.MONTH,
  defaultValue: new Date(),
  maxDate: new Date(),
  minDate: null,
  disabledAllBtn: false,
  hasDay: false,
  hasAll: true,
  hasYear: true
};
DateFilter.propTypes = {
  defaultType: _react2.default.PropTypes.oneOf([FilterType.ALL, FilterType.DAY, FilterType.MONTH, FilterType.YEAR])
};
exports.default = DateFilter;