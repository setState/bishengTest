import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/table.css';
import 'react-bootstrap-table/css/style.css';
import './style.css';

import {Select} from 'antd';
const Option = Select.Option;

BootstrapTable.TableHeaderColumn = TableHeaderColumn;

const paginationPanelFunc = function (props) {
  return (
    <div style={{overflow: "hidden"}} key="page-wrapper">
      <div style={{float: "left"}}>
        {props.components.sizePerPageDropdown}
      </div>
      <div style={{float: "right"}}>{props.components.pageList}</div>
    </div>
  );
}

const sizePerPageDropDownFunc = function (props) {
  return (
    <Select
      key="page-select"
      style={{width: "60px"}}
      size="large"
      value={props.currSizePerPage}
      onChange={(n) => props.changeSizePerPage(n)}
    >
      {
        props.sizePerPageList.map(function (item) {
          return (
            <Option key={item.toString()}>{item}</Option>
          );
        })
      }
    </Select>
  )
}

BootstrapTable.defaultProps.paginationPanelAlias = paginationPanelFunc;

BootstrapTable.defaultProps.sizePerPageDropDownAlias = sizePerPageDropDownFunc;

export default BootstrapTable;
