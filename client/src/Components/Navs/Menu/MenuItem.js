import React from 'react';
import { Link } from 'react-router';

import './MenuItem.less';

export default class MenuItem extends React.Component {

    render() {
        return (
            <Link
                className={location.pathname.startsWith(this.props.url) ? `MenuItem active ${this.props.color}` : `MenuItem`}
                to={this.props.url}
                onClick={this.props.onClick}
            >
                <header>{this.props.label}</header>
            </Link>
        );
    };
}