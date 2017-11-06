/**
 * Created by neo on 15/11/5.
 */
import React from 'react';
import {Input} from 'antd'
import './style.css';

let CountText = React.createClass({
  remainingCharacters: function () {
    if (this.props.value)
      return this.props.maxLength - this.props.value.length;
    else
      return this.props.maxLength;
  },
  onChange(e){
    const {value, maxLength, onChange}=this.props;

    if (e.target.value.length <= maxLength)
      onChange && onChange(e.target.value);
    else
      onChange && onChange(e.target.value.substr(0, maxLength));
  },
  render: function () {
    const {textStyle, onChange, maxLength, type, placeholder, ...other}=this.props;

    return (
      <div className="countText">
        <Input
          {...other}
          type="textarea"
          style={textStyle}
          onChange={this.onChange}
          placeholder={placeholder || `请输入文字,字数不能超过${maxLength}个`}
        />
        <p style={{marginTop: "-6px"}}>
          剩余{this.remainingCharacters()}字
        </p>
      </div>
    );
  }
});

CountText.propTypes = {
  maxLength: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  textStyle: React.PropTypes.object,
  //value: React.PropTypes.string
};

CountText.defaultProps = {
  maxLength: 200,
  textStyle: {},
  //value: ''
};

export default CountText;
