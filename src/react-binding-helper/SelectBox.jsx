import React from 'react';
import createReactClass from 'create-react-class';
import {Select} from 'antd';

const SelectBox = createReactClass({
  render: function () {
    let {model, renderOption, dataList, onChange, ...other} = this.props;

    let valueModel = model;
    const handleChange = function (value) {
      if (onChange)
        valueModel.value = onChange(value);
      else
        valueModel.value = value;
    };

    let options = dataList.map(item => {
      return renderOption(item);
    });

    return (
      <Select
        {...other}
        onChange={handleChange}
        value={valueModel.value}
      >
        {options}
      </Select>
    )
  }
});

export default SelectBox;
