import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './Menu.less';

import { MenuItem } from './index';

@connect((store) => {
    return {
        homeState: store.home
    }
})
export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logo: '/images/logo.png',
            isOpen: false
        };

        this.hamburgerClickHandler = this.hamburgerClickHandler.bind(this);
        this.routeClickHandler = this.routeClickHandler.bind(this);
    };

    componentWillUnmount() {
        return this.setState({
            ...this.state,
            isOpen: false
        });
    };

    hamburgerClickHandler() {
        return this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    };

    routeClickHandler() {
        return this.setState({
            ...this.state,
            isOpen: false
        });
    };

    render() {
        const homeState = this.props.homeState;

        return (
            <section className='Menu'>
                <div
                    className={this.state.isOpen ? 'hamburger active' : 'hamburger'}
                    onClick={this.hamburgerClickHandler}
                >
                    <i className='material-icons'>menu</i>
                </div>

                <Link className='logo' to='/'>
                    <img src={this.state.logo} />
                </Link>

                <nav className={this.state.isOpen ? 'menuList active' : 'menuList'}>
                    <MenuItem label='Timer' url='/timer' color='timer' onClick={this.routeClickHandler} />
                    <MenuItem label='Serviced Timer' url='/serviced-timer' icon='cake' color='red' onClick={this.routeClickHandler} />
                    <MenuItem label='Unplanned Route' url='/unplanned-error' color='blue' onClick={this.routeClickHandler} />
                </nav>
            </section>
        );
    };
};