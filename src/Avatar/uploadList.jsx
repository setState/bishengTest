import React from 'react';
import {Icon} from 'antd';
import {Gallery} from 'component';
import objectAssign from 'object-assign';
import isNaN from 'lodash/isNaN';
const prevCls = "ovo-avatar";

const styles = {
  marginRight: '10px'
};

export default class UploadList extends React.Component {
  static defaultProps = {
    items: [],
    progressAttr: {
      strokeWidth: 3,
      showInfo: false
    },
    styles: {}
  };

  handleImageRemove(img) {
    let arr = [];
    if (this.props.items) {
      arr = this.props.items.filter(file => file.key == img.id)
    }

    this.props.onRemove && this.props.onRemove(arr[0]);
  }

  renderGallery() {
    let images = [];

    if (this.props.items) {
      images = this.props.items.map(function (file) {
        return {
          id: file.key,
          src: file.src
        }
      });
    }

    return images;
  }

  getSize() {
    let aspectRatio = 1;

    if (this.props.aspectRatio && !isNaN(this.props.aspectRatio)) {

      aspectRatio = this.props.aspectRatio;

    }

    const thumbnailHeight = this.props.width / aspectRatio;

    return {
      height: Math.floor(thumbnailHeight),
      width: this.props.width,
      objectFit: this.props.objectFit
    };
  }

  getSingleImg() {
    let image = "";

    if (this.props.items && this.props.items.length >= 0) {
      image = this.props.items[0].src;
    }


    return <img className={`${prevCls}-input-img`} style={this.getSize()} src={image} alt=""/>;
  }

  render() {


    return (
      <div style={objectAssign({}, styles, this.props.styles)}>
        {this.getSingleImg()}
      </div>
    );
  }
}
