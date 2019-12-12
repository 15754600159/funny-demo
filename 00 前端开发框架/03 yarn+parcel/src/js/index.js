// 引入css, less文件
import '../less/app.less';

// js库
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill'; // 垫片库 用于支持ES6的API
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // redux管理异步
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './api/config'; // 配置请求相关

// js组件
import Loading from './component/loading/loading';
import PageA from './pages/pageA/pageA';
import PageB from './pages/pageB/pageB';


ReactDOM.render(
    <div>
        <Loading></Loading>
        <BrowserRouter>
            <Switch>
                <Route path="/pageA" component={PageA}></Route>
                <Route path="/pageB" component={PageB}></Route>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById('container-wrapper')
);