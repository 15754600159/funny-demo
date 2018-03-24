import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // redux管理异步
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'babel-polyfill'; // 垫片库 用于支持ES6的API

import './index.css';

import reducer from './reducer';
import './config'; // 引入默认执行JS文件
import App from './app';


const store = createStore(reducer, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,    
    document.getElementById('root')
);
