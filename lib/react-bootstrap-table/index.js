'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapTable = require('react-bootstrap-table');

require('react-bootstrap-table/css/react-bootstrap-table.css');

require('react-bootstrap-table/css/table.css');

require('react-bootstrap-table/css/style.css');

require('./style.css');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;

_reactBootstrapTable.BootstrapTable.TableHeaderColumn = _reactBootstrapTable.TableHeaderColumn;

var paginationPanelFunc = function paginationPanelFunc(props) {
  return _react2.default.createElement(
    'div',
    { style: { overflow: "hidden" }, key: 'page-wrapper' },
    _react2.default.createElement(
      'div',
      { style: { float: "left" } },
      props.components.sizePerPageDropdown
    ),
    _react2.default.createElement(
      'div',
      { style: { float: "right" } },
      props.components.pageList
    )
  );
};

var sizePerPageDropDownFunc = function sizePerPageDropDownFunc(props) {
  return _react2.default.createElement(
    _antd.Select,
    {
      key: 'page-select',
      style: { width: "60px" },
      size: 'large',
      value: props.currSizePerPage,
      onChange: function onChange(n) {
        return props.changeSizePerPage(n);
      }
    },
    props.sizePerPageList.map(function (item) {
      return _react2.default.createElement(
        Option,
        { key: item.toString() },
        item
      );
    })
  );
};

_reactBootstrapTable.BootstrapTable.defaultProps.paginationPanelAlias = paginationPanelFunc;

_reactBootstrapTable.BootstrapTable.defaultProps.sizePerPageDropDownAlias = sizePerPageDropDownFunc;

exports.default = _reactBootstrapTable.BootstrapTable;