'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function noop() {}

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
var SPEED = 50;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
var DELAY = 600;

exports.default = {
  getDefaultProps: function getDefaultProps() {
    return {
      max: Infinity,
      min: -Infinity,
      step: 1,
      style: {},
      defaultValue: null,
      onChange: noop,
      onKeyDown: noop,
      onFocus: noop,
      onBlur: noop
    };
  },
  getInitialState: function getInitialState() {
    var value = void 0;
    var props = this.props;
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }
    value = this.toPrecisionAsStep(value);
    return {
      inputValue: value,
      value: value,
      focused: props.autoFocus
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      var value = this.toPrecisionAsStep(nextProps.value);
      this.setState({
        inputValue: value,
        value: value
      });
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.stop();
  },
  onChange: function onChange(e) {
    this.setInputValue(this.getValueFromEvent(e).trim());
  },
  onFocus: function onFocus() {
    var _props;

    this.setState({
      focused: true
    });
    (_props = this.props).onFocus.apply(_props, arguments);
  },
  onBlur: function onBlur(e) {
    var _props2;

    this.setState({
      focused: false
    });
    var value = this.getCurrentValidValue(this.getValueFromEvent(e).trim());
    this.setValue(value);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_props2 = this.props).onBlur.apply(_props2, [e].concat(args));
  },
  getCurrentValidValue: function getCurrentValidValue(value) {
    var val = value;
    var props = this.props;
    if (val === '') {
      val = '';
    } else if (!isNaN(val)) {
      val = Number(val);
      if (val < props.min) {
        val = props.min;
      }
      if (val > props.max) {
        val = props.max;
      }
    } else {
      val = this.state.value;
    }
    return this.toPrecisionAsStep(val);
  },
  setValue: function setValue(v) {
    if (!('value' in this.props)) {
      this.setState({
        value: v,
        inputValue: v
      });
    }
    var newValue = isNaN(v) || v === '' ? undefined : v;
    if (newValue !== this.state.value) {
      this.props.onChange(newValue);
    } else {
      // revert input value
      this.setState({
        inputValue: this.state.value
      });
    }
  },
  setInputValue: function setInputValue(v) {
    this.setState({
      inputValue: v
    });
  },
  getPrecision: function getPrecision() {
    var props = this.props;
    var stepString = props.step.toString();
    if (stepString.indexOf('e-') >= 0) {
      return parseInt(stepString.slice(stepString.indexOf('e-') + 1), 10);
    }
    var precision = 0;
    if (stepString.indexOf('.') >= 0) {
      precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
  },
  getPrecisionFactor: function getPrecisionFactor() {
    var precision = this.getPrecision();
    return Math.pow(10, precision);
  },
  toPrecisionAsStep: function toPrecisionAsStep(num) {
    if (isNaN(num) || num === '') {
      return num;
    }
    var precision = this.getPrecision();
    return Number(Number(num).toFixed(Math.abs(precision)));
  },
  upStep: function upStep(val) {
    var _props3 = this.props,
        step = _props3.step,
        min = _props3.min;

    var precisionFactor = this.getPrecisionFactor();
    var result = void 0;
    if (typeof val === 'number') {
      result = (precisionFactor * val + precisionFactor * step) / precisionFactor;
    } else {
      result = min === -Infinity ? step : min;
    }
    return this.toPrecisionAsStep(result);
  },
  downStep: function downStep(val) {
    var _props4 = this.props,
        step = _props4.step,
        min = _props4.min;

    var precisionFactor = this.getPrecisionFactor();
    var result = void 0;
    if (typeof val === 'number') {
      result = (precisionFactor * val - precisionFactor * step) / precisionFactor;
    } else {
      result = min === -Infinity ? -step : min;
    }
    return this.toPrecisionAsStep(result);
  },
  step: function step(type, e) {
    if (e) {
      e.preventDefault();
    }
    var props = this.props;
    if (props.disabled) {
      return;
    }
    var value = this.getCurrentValidValue(this.state.value);
    this.setState({ value: value });
    if (isNaN(value)) {
      return;
    }
    var val = this[type + 'Step'](value);
    if (val > props.max || val < props.min) {
      return;
    }
    this.setValue(val);
    this.setState({
      focused: true
    });
  },
  stop: function stop() {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  },
  down: function down(e, recursive) {
    var _this = this;

    if (e.persist) {
      e.persist();
    }
    this.stop();
    this.step('down', e);
    this.autoStepTimer = setTimeout(function () {
      _this.down(e, true);
    }, recursive ? SPEED : DELAY);
  },
  up: function up(e, recursive) {
    var _this2 = this;

    if (e.persist) {
      e.persist();
    }
    this.stop();
    this.step('up', e);
    this.autoStepTimer = setTimeout(function () {
      _this2.up(e, true);
    }, recursive ? SPEED : DELAY);
  }
};