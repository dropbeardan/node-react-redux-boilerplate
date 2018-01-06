import React from 'react';

import './App.less';

import { Menu } from '../../Navs';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='App'>
                <Menu />
                {this.props.children}
            </div>
        );
    };
}