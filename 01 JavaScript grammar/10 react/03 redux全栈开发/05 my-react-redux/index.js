/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:44 
 * @Last Modified by:   果实o 
 * @Last Modified time: 2018-03-07 11:15:44 
 */
import React from 'react';
import ReactDOM from 'react-dom';
// , applyMiddleware, compose
import { createStore, applyMiddleware } from './my-redux';
import thunk from './my-redux-thunk'; // redux管理异步
import arrayThunk from './my-redux-arrayThunk'; // action支持数组
import { Provider } from './my-react-redux';

import App from './App';
import { counter } from './index.redux';

const store = createStore(
    counter,
    applyMiddleware(thunk, arrayThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
