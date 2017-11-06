import React from 'react';

const create = (isMaster, options) => class Panel extends React.Component {
  render() {
    return this.props.children
  }
}

const decorate = (isMaster, options, COM) => class Panel extends React.Component {
  render() {
    return (
      <COM {...this.props} />
    )
  }
}

export default {create, decorate}
