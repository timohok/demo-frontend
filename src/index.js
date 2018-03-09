import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import { render } from 'react-dom'
import App from './App';
import reducers from './reducers/index'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const middleware = [ thunk ];

const store = createStore(reducers, applyMiddleware(...middleware));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
