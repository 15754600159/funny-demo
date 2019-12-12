// js库
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // redux管理异步
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

// 引入css, less文件
import './css/test.css';
import './less/app.less';

// 我的组件
import './js/api/config'; // 请求配置
import reducer from './reducer';
import PageA from './js/pages/pageA/pageA';
import PageB from './js/pages/pageB/pageB';
import Loading from './js/component/loading/loading';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));

ReactDOM.render(
    <Provider store={store}>
        <div>
            hello webpack
            <Loading />
            <HashRouter >
                <div>
                    <ul>
                        <li><Link to="/pagea">pageA</Link></li>
                        <li><Link to="/pageb">pageB</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/pagea" component={PageA} />
                        <Route path="/pageb" component={PageB} />
                    </Switch>
                </div>
            </HashRouter >
        </div>
    </Provider>,
    document.getElementById('container'),
);

export default store;

