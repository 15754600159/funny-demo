import express from 'express'; // 可以使用es6的模块语法了
const bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path');

const userRouter  = require('./user'),
    model = require('./model'),
    Chat = model.getModel('chat');

// 前端组件
import React from 'react';
import { renderToString } from 'react-dom/server'; // react组件 => div
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // redux管理异步
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import csshook from 'css-modules-require-hook/preset'; // 用于处理服务端加载CSS的问题
import assethook from 'asset-require-hook'; // 用于处理服务端加载图片、字体的问题
assethook({
    extensions: ['png', 'jpg']
});

import staticPath from '../build/asset-manifest.json';

import App from '../src/app';
import reducer from '../src/reducer';

const app = new express();

// socket work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('user login');
    socket.on('sendmsg', (data) => {
        const {from, to, msg} = data,
            chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content: msg}, (err, doc) => {
            io.emit('recievemsg', Object.assign({}, doc._doc));
        })
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

// react路径处理
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    const store = createStore(reducer, compose(
        applyMiddleware(thunk), 
    ));
    let context = {};
    const markup = renderToString( // renderToNodeStream性能更佳
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>)
    );
    const pageHtml = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <link rel="stylesheet" href="/${staticPath['main.css']}">
                <title>React App</title>
            </head>
            <body>
                <noscript>
                You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">${markup}</div>

                <script src="/${staticPath['main.js']}"></script>
            </body>
        </html>
    `;

    return res.send(pageHtml);
});
app.use('/', express.static(path.resolve('build'))); // 将build设为静态资源库

server.listen(9093, () => {
    console.log('Node app start at port 9093');
})