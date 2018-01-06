import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demoReducer from './demoReducer';

export default combineReducers({
    demo: demoReducer,
    routing: routerReducer
});

