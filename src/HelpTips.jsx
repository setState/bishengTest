/**
 * Created by neo on 16/5/26.
 */

import React from 'react';

import {PanelModal} from 'component';

const cStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    border: 'none',
    padding: 0,
    width: '700px'
  }
};

export default class HelpTips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  toggleModal = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    const {title, children, className, customStyles} = this.props;

    return (
      <div className={className}>
        <a onClick={this.toggleModal}>帮助?</a>
        <PanelModal
          isOpen={this.state.open}
          closeModal={this.toggleModal}
          title={title || "帮助"}
          customStyles={customStyles || cStyles}>
          {children}
        </PanelModal>
      </div>
    )
  }

}
