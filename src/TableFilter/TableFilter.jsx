/**
 * Created by neo on 16/4/22.
 */
import React from 'react';
import createReactClass from 'create-react-class';
import classNames from 'classnames';

import './style.css';

const TableFilter = createReactClass({
  render() {
    const {className, ...others} = this.props;

    const classes = classNames({
      'table-filter': true,
      'clearfix': true,
      [className]: className
    });

    return <div {...others} className={classes}/>;
  }
});

export default TableFilter;
