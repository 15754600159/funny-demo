const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

const userRouter  = require('./user');
    
const app = new express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(9093, () => {
    console.log('Node app start at port 9093');
})