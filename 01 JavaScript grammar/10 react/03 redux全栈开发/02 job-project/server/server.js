const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path');

const userRouter  = require('./user'),
    model = require('./model'),
    Chat = model.getModel('chat');
    
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
    if (req.url.startWith('/user/') || req.url.startWith('/static/')) {
        return next();
    }
    return res.sendFile(path.resolve('build/index.html'));
});

server.listen(9093, () => {
    console.log('Node app start at port 9093');
})