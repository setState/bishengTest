'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('echarts/lib/chart/bar');

var _ChartBase2 = require('./ChartBase');

var _ChartBase3 = _interopRequireDefault(_ChartBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bar = function (_ChartBase) {
  _inherits(bar, _ChartBase);

  function bar() {
    _classCallCheck(this, bar);

    return _possibleConstructorReturn(this, (bar.__proto__ || Object.getPrototypeOf(bar)).apply(this, arguments));
  }

  return bar;
}(_ChartBase3.default);

bar.defaultProps = {
  type: 'bar'
};
exports.default = bar;