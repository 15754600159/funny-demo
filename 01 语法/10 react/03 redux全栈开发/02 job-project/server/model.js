const mongoose = require('mongoose');

// 连接mongoDB 中的 imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc-job';
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        // 头像
        'avatar': {'type': String},
        // 个人简介 | 职位简介
        'desc': {'type': String},
        // 职位名
        'title': {'type': String},
        // boss专属字段 两个
        'company': {'type': String},
        'money': {'type': String},
    },
    chat: {
        'chatid': {'type': String, 'require': true},
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'read': {'type': Boolean, 'default': false},
        'content': {'type': String, 'require': true, 'default': ''},
        'create_time': {'type': Number, 'default': new Date().getTime()},
    },
}

for (let i of Object.keys(models)) {
    mongoose.model(i, new mongoose.Schema(models[i]));
}

module.exports = {
    getModel: (name) => {
        return mongoose.model(name);
    },
}