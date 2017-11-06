import React from 'react';
import createReactClass from 'create-react-class';
import icons from './icons';

module.exports = createReactClass({
  displayName: 'Icon',
  propTypes: {
    type: React.PropTypes.oneOf(Object.keys(icons))
  },
  render () {
    return <span dangerouslySetInnerHTML={{__html: icons[this.props.type]}} {...this.props} />
  },
});
