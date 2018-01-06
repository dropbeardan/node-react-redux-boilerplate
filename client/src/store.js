import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';

import reducers from './Reducers';

const middleware = applyMiddleware(thunk);

export default createStore(reducers, middleware);