import React from 'react';
import {Icon, message} from 'antd';

import ImageCropper from './ImageCropper';
import ImageInput from './ImageInput';
import UploadList from './uploadList';
import isNaN from 'lodash/isNaN';

const prevCls = "ovo-avatar";

function noop() {
}

function getFileItem(file, fileList) {
  let target = fileList.filter((item) => {
    return item.key === file.key;
  })[0];
  return target;
}

export default class Upload extends React.Component {

  static defaultProps = {
    multiple: false,
    onChange: noop,
    showUploadList: true,
    className: '',
    aspectRatio: 4 / 3,
    cropQuality: 0.9,
    width: 96,
    hiddenCropper: true,
    maxSize: 10,
  }

  constructor(props) {
    super(props);

    let fileList = [];

    if (this.props.value)
      fileList.push({
        src: this.props.value
      });

    this.state = {
      fileList: fileList,
      initialed: false,
      croppingFileObj: null
    };
  }

  componentWillReceiveProps(nextProps) {
    let fileList = [];

    if (nextProps.value) {
      if (typeof nextProps.value == "string") {
        fileList.push({
          src: nextProps.value
        })
      } else if (typeof nextProps.value == "object") {
        fileList.push(nextProps.value);
      }
    }

    this.setState({fileList})
  }

  onFileLoaded(fileObj) {
    // choose callback
    if (this.props.hiddenCropper === true) {
      this.cropImage(fileObj)
    } else {
      this.setState({croppingFileObj: fileObj});
    }
  }

  cropImage(fileObj, clip) {
    fileObj.clip = clip;

    this.onChange(fileObj);

  }

  onChange = (fileInfo) => {
    // final trigger
    const {maxSize, onChange} = this.props;

    if (fileInfo.file.size / 1024 / 1024 >= maxSize) {
      message.error(`图片必须小于 ${maxSize}MB!`);
    } else {
      this.setState({
        fileList: [fileInfo]
      }, () => {
        if (onChange) {
          onChange(fileInfo);
        }
      });
    }
  }

  getUploadList() {
    const {width, height, objectFit}=this.props;

    let uploadList;
    if (this.props.showUploadList) {
      if (this.state.fileList.length > 0) {

        uploadList = (
          <UploadList
            multi={false}
            preview={ this.props.viewOnly }
            items={this.state.fileList}
            aspectRatio={this.props.aspectRatio}
            width={this.props.width}
            styles={{
              marginRight: 0
            }}
            objectFit={objectFit}
          />
        );
      } else {
        uploadList = (
          <Icon type="plus" className={`${prevCls}-uploader-trigger`} style={{
            width: width,
            height: height,
          }}/>
        )
      }
    }
    return uploadList;
  }

  getAspectRatio() {

    const {aspectRatio} = this.props;


    let aspectRatioNum = 1;

    if (aspectRatio && !isNaN(aspectRatio)) {

      aspectRatioNum = this.props.aspectRatio;

    }

    return {
      ratio: aspectRatioNum,
    }

  }

  render() {
    const {cropper, viewOnly, width, height, ...props} =this.props;
    let inputProps = {
      ...props,
      onFileLoaded: this.onFileLoaded.bind(this),
      viewOnly: false
    };

    const aspectRatio = this.getAspectRatio();

    const uploadList = this.getUploadList();

    const cropperProps = {
      fileObj: this.state.croppingFileObj,
      onImageCrop: this.cropImage.bind(this),
      aspectRatio: aspectRatio.ratio,
      quality: this.props.cropQuality
    }

    return (
      <div className={prevCls} style={{position: 'relative', height: height, width: width}}>
        {uploadList}
        <ImageInput {...inputProps}>
          {this.props.children}
        </ImageInput>
        <ImageCropper {...cropperProps}/>
      </div>
    );
  }

  // useful api
  getAllFile() {

    const {fileList} = this.state;

    let arr = [];

    fileList.forEach(function (val) {
      if (val.file)
        arr[arr.length] = val.file;
    });

    return arr;
  }

  removeAllFiles() {
    this.setState({fileList: []})
  }

}
