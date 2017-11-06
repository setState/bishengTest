import React from 'react';
import createReactClass from 'create-react-class';
import AvatarUpload from './AvatarUpload';
import './style.css';

const prevCls = "ovo-avatar";

const Avatar = createReactClass({
  getDefaultProps: function () {
    return {
      text: '选择图片',
      width: 96,
      height: 96
    };
  },
  onChange(file){
    this.props.onChange(file);
  },
  render() {
    const {text, ...others} =this.props;
    return (
      <AvatarUpload
        onChange={this.onChange}
        {...others}>
        <div className={`${prevCls}-container`}
             style={{
               width: this.props.width,
               height: this.props.height,
               lineHeight: this.props.height + "px"
             }}>
          <div className={`${prevCls}-text`}>{text}</div>
        </div>
      </AvatarUpload>
    );
  }
})

export default Avatar;
