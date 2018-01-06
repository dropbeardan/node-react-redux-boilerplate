import React from 'react';
import { connect } from 'react-redux';

import './Timer.less';

@connect((store) => {
    return {
        demo: store.demo
    };
})
export default class Timer extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='Timer'>
                The current Date-Time is:<br />
                {this.props.demo.time.toString()}
            </div>
        );
    };
}