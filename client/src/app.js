import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Routing.
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Store.
import store from './store';

// Layouts.
import { App, Err404, ServicedTimer, Timer } from './Components/Layouts';

// Browser History.
const history = syncHistoryWithStore(browserHistory, store);

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Timer} />
            </Route>
            <Route path='/timer' component={App}>
                <IndexRoute component={Timer} />
            </Route>
            <Route path='/serviced-timer' component={App}>
                <IndexRoute component={ServicedTimer} />
            </Route>
            <Route path='*' component={App}>
                <IndexRoute component={Err404} />
            </Route>
        </Router>
    </Provider >,
    app
);