import React, {Component, PropTypes as T} from 'react'

import './style.css'

import wangEditor from 'wangeditor'

export default class Editor extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    onChange: T.func,
    initValue: T.string,
    menus: T.array,
    uploadImgUrl: T.string,     // 文件上传 url
    uploadParams: T.object,     // 文件上传所需参数
    uploadHeaders: T.object,     // 文件上传所需HTTP头部
    height: T.oneOfType([T.string, T.number]),     // 文件上传所需HTTP头部
  }

  static defaultProps = {
    menus: [
      "|",
      "bold",
      "underline",
      "italic",
      "strikethrough",
      "eraser",
      "forecolor",
      "bgcolor",
      "|",
      "quote",
      "fontfamily",
      "fontsize",
      "head",
      "unorderlist",
      "orderlist",
      "alignleft",
      "aligncenter",
      "alignright",
      "|",
      "link",
      "unlink",
      "table",
      "|",
      "img",
      "video",
      "|",
      "undo",
      "redo",
      "fullscreen",
    ],
    height: 200
  }

  onEditorChange = () => {
    this.props.onChange && this.props.onChange(this.__editor__.$txt.html())
  }

  componentDidMount() {
    this.__editor__ = new wangEditor('editor-trigger')
    this.__editor__.onchange = this.onEditorChange
    // config
    // close log
    this.__editor__.config.printLog = false;
    // menu
    this.__editor__.config.menus = this.props.menus;
    // color ：可以自定义颜色，后期需要确定系统中的颜色，要求Design给出颜色后，可以配置
    // editor.config.colors = { "#ffffff": "白色", "#000000": "黑色"}

    // 图片上传配置，需要后台支持，参考  http://www.kancloud.cn/wangfupeng/wangeditor2/113992
    // this.__editor__.config.uploadImgUrl = this.props.uploadImgUrl
    // this.__editor__.config.uploadParams = this.props.uploadParams
    // this.__editor__.config.uploadHeaders = this.props.uploadHeaders

    // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
    // editor.config.hideLinkImg = true;

    // 约定
    // 上传成功后，server 端需要返回（即：response）图片的 url 地址，例如：
    // "http://xxx.com/imgs/abc.png"


    this.__editor__.create()

    // init
    if (this.props.initValue) {
      this.__editor__.$txt.html(this.props.initValue)
    }
  }

  componentWillUnmount() {
    this.__editor__.destroy();
    this.__editor__ = null;
    delete this.__editor__;
  }

  render() {
    const {height} = this.props;
    return (
      <div style={{padding: '2em'}} className="editor-trigger-container-class">
        <div id="editor-trigger" style={{height: height}}>
        </div>
      </div>
    );
  }

  // api
  html = () => {
    return this.__editor__.$txt.html();
  }
  clear = () => {
    this.__editor__.$txt.html('<p><br></p>');
  }
  images = () => {
    return this.__editor__.$txt.find('img');
  }
  disable = () => {
    this.__editor__.disable()
  }
  enable = () => {
    this.__editor__.enable()
  }

}
