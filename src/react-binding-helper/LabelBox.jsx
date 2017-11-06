import React from 'react';
import createReactClass from 'create-react-class';

const LabelBox = createReactClass({
  render() {
    let {model, ...other} = this.props;

    var valueModel = model;

    return (
      <label {...other}>{valueModel.value}</label>
    )
  }
});

export default LabelBox;
