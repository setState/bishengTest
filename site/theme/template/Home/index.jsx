import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
    constructor(...props) {
        super(...props);
    }

    componentDidMount() {

    }

    render() {
        return (
          <div><Link to={{ pathname: 'pageModule/button'}}>查看API</Link></div>
        )
    }
}
