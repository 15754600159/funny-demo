const mongoose = require('mongoose');

// 连接mongoDB 中的 imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);