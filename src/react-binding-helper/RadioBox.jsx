import React from 'react';
import createReactClass from 'create-react-class';

//todo opposite value
const RadioBox = createReactClass({
  isChecked(){
    let {model, dataValue} = this.props;

    if (model.value == dataValue)
      return true;
    else
      return false;
  },
  render: function () {
    let {model, dataValue, ...other} = this.props;

    let valueModel = model;
    const handleChange = function (e) {
      if (valueModel.value != dataValue)
        if (valueModel.value == "1")
          valueModel.value = "2";
        else
          valueModel.value = "1";
    };

    return <input {...other} type="radio" onChange={handleChange} checked={this.isChecked()}/>
  }
});

export default RadioBox;
