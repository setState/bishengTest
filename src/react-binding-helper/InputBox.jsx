import React from 'react';
import createReactClass from 'create-react-class';
import {Input} from 'antd';

const InputBox = createReactClass({
  handleChange(e){
    const {model, validator} = this.props;
    const newValue = validator ? validator(e.target.value) : e.target.value;

    model.value = newValue.replace(/\s/g, '');

    if (this.props.onChange) {
      this.props.onChange(e);
    }

  },
  handleBlur(e){
    const {model} = this.props;
    model.value = e.target.value.replace(/\s/g, '');
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  render() {
    let {model, validator, style, onBlur, onChange, ...other} = this.props;

    style = style || {};
    style.border = '1px solid #d9d9d9 !important';

    return (
      <Input ref="input"
             style={style}
             {...other}
             onBlur={this.handleBlur}
             onChange={this.handleChange}
             size="large"
             value={model.value}/>
    )
  },
});

export default InputBox;
