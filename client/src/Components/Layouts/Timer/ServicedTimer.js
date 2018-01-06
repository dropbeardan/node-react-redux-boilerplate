import React from 'react';
import { connect } from 'react-redux';

import './Timer.less';

import { DemoService } from '../../Services';

@connect((store) => {
    return {
        demo: store.demo
    };
})
export default class ServicedTimer extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='Timer'>
                The current Date-Time is:<br />
                {this.props.demo.time.toString()}

                <DemoService />
            </div>
        );
    };
}