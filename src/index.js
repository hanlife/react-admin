import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import Routes from './routes/index'

import rootReducer from './reducer';

const store = createStore(rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))



ReactDOM.render( <Provider store={store}>
                    <Routes />
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
