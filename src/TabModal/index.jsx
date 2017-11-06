import React from 'react';
import createReactClass from 'create-react-class';
/*import Icon from 'react-fa';*/
import Modal from 'react-modal';
import ElementClass from '../element-class';
import {Icon} from 'antd';

import './style.css';

import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    outline: 'none',
    padding: '0px',
    minWidth: '700px',
    transform: 'translate(-50%,-50%)',
  },
  contentLimit: {}
};

const PanelModal = createReactClass({
  getDefaultProps: function () {
    return {
      tabs: [],
      shouldCloseOnOverlayClick: true, // 点击遮罩，是否关闭浮窗；true:关闭，false:不关闭
      contentLabel: "tab-modal",
    };
  },
  getInitialState(){
    return {
      isOpen: false
    }
  },
  whichStyle(){
    const customStylesProp = this.props.customStyles || {};
    const style = this.props.style || {};

    const contentStyle = {
      ...customStyles.content,
      ...style,
      ...customStylesProp.content
    };

    const contentLimitStyle = {
      ...customStyles.contentLimit,
      ...customStylesProp.contentLimit
    };


    return {
      content: contentStyle,
      contentLimit: contentLimitStyle
    }
  },
  getBodyStyle(){
    if (this.props.customStyles && this.props.customStyles.contentLimit)
      return this.props.customStyles.contentLimit;
    else
      return customStyles.contentLimit
  },
  onTabChangeHandler(key) {
    this.props.onTabChange && this.props.onTabChange(key);
  },

  renderContent(title, tabs, content, padding, props){
    let result = null,
      tabEles = [],
      style = padding ? {padding: '24px'} : {};

    if (tabs && Array.isArray(tabs) && tabs.length > 0) {
      tabs.forEach((val, index) => tabEles.push(
        <TabPane tab={val.title} key={ 'tab' + index }
                 disabled={val.disabled ? true : false} {...props}>
          <div style={style}>{val.content || ''}</div>
        </TabPane>
      ));
      if (title) {
        result = (
          <div className="card-container">
            <Tabs onChange={this.onTabChangeHandler} type="card" {...props}>
              {tabEles}
            </Tabs>
          </div>
        );
      } else {
        result = (
          <div className="card-container">
            <a onClick={this.props.closeModal} className="tab-modal-close">
              <Icon type="close"/>
            </a>
            <Tabs onChange={this.onTabChangeHandler} type="card" destroyInactiveTabPane>
              {tabEles}
            </Tabs>
          </div>
        );
      }
    } else {
      if (content) {
        result = (
          <div className="card-container" style={{marginTop: '16px', borderTop: '1px solid #eaeaea'}}>{content}</div>
        )
      }
    }
    return result;
  },
  renderChildren(isNeed){
    let result = '';
    if (isNeed) {
      result = this.props.children;
    }
    return result;
  },
  checkScrollBar(){
    //true 有滚动条
    let flag = document.body.scrollHeight > document.body.clientHeight;
    if (flag)
      ElementClass(document.body).add('ReactModal__Body--lock');
    else
      ElementClass(document.body).remove('ReactModal__Body--lock');
  },
  afterOpenModal() {
    ElementClass(document.body).add('ReactModal__Body--open');
  },
  closeModal(){
    if (this.props.isOpen === undefined)
      this.setModal(false);

    if (this.props.closeModal)
      this.props.closeModal();
  },
  setModal(flag){
    this.setState({isOpen: flag == true})
  },
  render(){
    let {customStyles, style, title, tabs, content, isOpen, padding = true, destroyInactiveTabPane, ...others} = this.props;

    if (isOpen === undefined)
      isOpen = this.state.isOpen;

    this.checkScrollBar();

    return (
      <Modal
        onAfterOpen={this.afterOpenModal}
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        {...others}
        style={this.whichStyle()}>
        <div className="modal-me">
          <div className="tab-cm-modal-content">
            {!title ? null :
              <div className="tab-cm-modal-title">
                <p>{title}</p>
                <a onClick={this.props.closeModal} className="tab-modal-close" style={{padding: '16px 16px'}}>
                  <Icon name="times"/>
                </a>
              </div>
            }
            {this.renderContent(title, tabs, content, padding, {
              destroyInactiveTabPane
            })}
            <div className="tab-cm-modal-body" id={this.props.id} style={this.getBodyStyle()}>
              {this.renderChildren(!tabs || !Array.isArray(tabs) || tabs.length == 0)}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
});

export default PanelModal;
