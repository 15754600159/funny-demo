import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // redux管理异步
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'babel-polyfill'; // 垫片库 用于支持ES6的API

import './index.css';

import reducer from './reducer';
import './config'; // 引入默认执行JS文件
import AuthRoute from './component/authroute/authroute';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

const store = createStore(reducer, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

// const store = createStore(reducer, compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : () => {}
// ));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,    
    document.getElementById('root')
);
