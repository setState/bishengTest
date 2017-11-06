/**
 * Created by neo on 15/10/30.
 */
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
/*import Icon from 'react-fa';*/
import {Icon} from 'antd';
import Modal from 'react-modal';
import './PanelModal.css';
import ElementClass from '../element-class';
import classNames from 'classnames';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    border: 'none',
    padding: 0,
    width: '500px'
  },
  contentLimit: {}
};

const PanelModal = createReactClass({
  propTypes: {
    containerClass: PropTypes.string,
    maskClosable: PropTypes.bool,
    closable: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      containerClass: "cm-modal-container",
      contentLabel: "panel-modal",
      shouldCloseOnOverlayClick: true,
      maskClosable: true, // overlay遮罩层是否能点击关闭，不建议使用shouldCloseOnOverlayClick属性。
      closable: true,
    }
  },
  getInitialState(){
    return {
      isOpen: false
    }
  },
  componentDidMount(){
    // this.checkScrollBar();
  },
  checkScrollBar(){
    //true 有滚动条
    let flag = document.body.scrollHeight > document.body.clientHeight;
    if (flag)
      ElementClass(document.body).add('ReactModal__Body--lock');
    else
      ElementClass(document.body).remove('ReactModal__Body--lock');
  },
  whichStyle(){
    if (this.props.customStyles)
      return this.props.customStyles;
    else
      return customStyles
  },
  setModal(flag){
    this.setState({isOpen: flag == true})
  },
  closeModal(){
    if (this.props.isOpen === undefined)
      this.setModal(false);

    if (this.props.closeModal)
      this.props.closeModal();
  },
  getBodyStyle(){
    if (this.props.customStyles && this.props.customStyles.contentLimit)
      return this.props.customStyles.contentLimit;
    else
      return customStyles.contentLimit
  },
  afterOpenModal() {
    ElementClass(document.body).add('ReactModal__Body--open');
  },
  getCloseIcon() {
    if (this.props.hasOwnProperty('closable') && !this.props.closable) {
      return '';
    } else {
      return (
        <a onClick={this.closeModal} className="close">
          <Icon type="close"/>
        </a>
      )
    }
  },
  render(){
    let {
      isOpen, title, id, children, nesting, containerClass,
      customStyles, shouldCloseOnOverlayClick, maskClosable,
      ...other
    } = this.props;

    if (isOpen === undefined)
      isOpen = this.state.isOpen;

    this.checkScrollBar();

    const classes = classNames({
      "cm-modal-dialog": true,
      [containerClass]: true
    });

    shouldCloseOnOverlayClick = maskClosable;

    return (
      <Modal
        onAfterOpen={this.afterOpenModal}
        isOpen={isOpen}
        nesting={nesting}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        onRequestClose={this.closeModal}
        style={this.whichStyle()}
        {...other}
      >
        <div className={classes}>
          <div className="cm-modal-content">
            <div className="cm-modal-header">
              {this.getCloseIcon()}
              <h4 className="cm-modal-title" style={{textAlign: "center"}}>{title ? title : "标题"}</h4>
            </div>
            <div className="cm-modal-body" id={id} style={this.getBodyStyle()}>
              {children}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
})

export default PanelModal;
