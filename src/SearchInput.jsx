'use strict';

import React from 'react';

import {Icon, Input, Button} from 'antd';
import classNames from 'classnames';

const InputGroup = Input.Group;

const SearchInput = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  },
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    const {size} = this.props;

    const btnStyle = {
      height: "26px"
    }

    if (size == "large")
      btnStyle.height = "30px";

    return (
      <div className="ant-search-input-wrapper">
        <InputGroup className={searchCls} style={this.props.style}>
          <Input {...this.props} value={this.state.value} onChange={this.handleInputChange}
                 onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur}/>
          <div className="ant-input-group-wrap">
            <Button className={btnCls} size={this.props.size} onClick={this.handleSearch} style={btnStyle}>
              <Icon type="search"/>
            </Button>
          </div>
        </InputGroup>
      </div>
    );
  }
});

export default SearchInput;
