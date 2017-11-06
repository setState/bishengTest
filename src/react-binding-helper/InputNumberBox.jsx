/**
 * 针对 null,""会自动显示为0的情况,处理为undefined
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Number from '../Number';

const InputBox = createReactClass({
  propTypes: {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  },
  getDefaultProps() {
    return {
      step: 1,
    };
  },
  handleChange(value){
    const {model} = this.props;

    model.value = value;

    if (this.props.onChange) {
      this.props.onChange(value);
    }

  },
  render() {
    let {model, style, onChange, ...other} = this.props;

    let value = model.value;

    if (value === null || value === "")
      value = undefined;

    style = style || {};

    return (
      <Number
        style={style}
        {...other}
        onChange={this.handleChange}
        size="large"
        value={value}/>
    )
  },
});

export default InputBox;
