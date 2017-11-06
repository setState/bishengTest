import React, {Component} from 'react'

import {Card} from 'antd'
import './style.css'


export default class FieldsetCard extends Component {

  constructor(props) {

    super(props)

  }

  render() {

    return (
      <div className="fieldsetCard">
        <Card {...this.props} />
      </div>
    )
  }
}
