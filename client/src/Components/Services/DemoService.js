import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import { DemoActions } from '../../Actions';

@connect((store) => {
    return {};
})
export default class DemoService extends React.Component {

    constructor(props) {
        super(props);

        this.activeTimers = [];

        this.addTimer = this.addTimer.bind(this);
        this.clearTimers = this.clearTimers.bind(this);
        this.updateTime = this.updateTime.bind(this);
    };

    componentDidMount() {
        this.addTimer(this.updateTime, 1000);
    };

    componentWillUnmount() {
        this.clearTimers();
    };

    addTimer(fn, interval) {
        let timer = setInterval(fn, interval);

        this.activeTimers.push(timer);
        window.addEventListener('beforeunload', () => { clearInterval(timer) });
    };

    clearTimers() {
        this.activeTimers.forEach((timer) => {
            clearInterval(timer);
            window.removeEventListener('beforeunload', () => { clearInterval(timer) });
        });
    };

    updateTime() {
        this.props.dispatch(DemoActions.setTime(moment()));
    };

    render() {
        return (
            <div className='DemoService' />
        );
    };
};