const express = require('express'),
    mongoose = require('mongoose');

// 连接mongoDB 中的 imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log('mongo connect seccess');
})

// 建一个集合
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}))
// // 新增数据
// User.create({
//     name: 'imooc',
//     age: 18
// }, (err, doc) => {
//     if(err) {
//         console.log(err);
//         return ;
//     }

//     console.log(doc);
// })

const app = new express();

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.get('/data', (req, res) => {
    User.find({}, (err, doc) => {
        res.json(doc);
    })
});

app.listen(9093, () => {
    console.log('Node app start at port 9093');
})