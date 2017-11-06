import React, {PropTypes} from 'react';
import createReactClass from 'create-react-class';
import {message} from 'antd';
import objectAssign from 'object-assign';

const prevCls = "ovo-avatar";

const now = +(new Date());
let index = 0;
function imageid() {
  return '__imageid__' + now + '-' + (++index);
}

const ImageInput = createReactClass({

  propTypes: {
    onFileLoaded: PropTypes.func,
  },

  onChange(e) {

    const files = e.target.files;
    const reader = new FileReader();

    reader.onload = () => {

      let type = files[0].type.split('/')[0];

      if (type && type == "image") {

        this.onFileLoaded(files[0], reader.result);

      } else {
        message.error('请选择图片！')
      }
    };

    reader.readAsDataURL(files[0]);
  },

  onFileLoaded(file, src) {

    const fileObj = {
      file,
      src,
      key: imageid(),
    };

    this.props.onFileLoaded && this.props.onFileLoaded(fileObj);
  },

  onClick() {
    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },

  render() {

    const props = this.props;

    let {styles, viewOnly}=props;

    let show = {
      display: "block"
    };

    if (viewOnly === true) {
      show.display = 'none';
    }

    return (
      <div
        className={`${prevCls}-field`}
        style={objectAssign({}, styles, show)}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onDrop={this.onFileDrop}
        onDragOver={this.onFileDrop}
        role="button"
        tabIndex="0"
      >
        <input type="file"
               ref="file"
               style={{display: 'none'}}
               disabled={ props.disabled }
               accept={props.accept}
               multiple={this.props.multiple}
               onChange={this.onChange}/>
        {props.children}
      </div>
    );
  }

});

export default ImageInput;
