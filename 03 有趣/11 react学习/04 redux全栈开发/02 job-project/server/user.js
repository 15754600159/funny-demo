const express = require('express'),
    utils = require('utility'); // 密码加密

const model = require('./model'),
    User = model.getModel('user'),
    Chat = model.getModel('chat');

const Router = express.Router(),
    _filter = {'pwd': 0, '__v': 0};

// 刚进页面，判断登录状态
Router.get('/info', (req, res) => {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({code: 1});
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({'code': 1, msg: '后台出错了'});
        }
        return res.json({code: 0, data: doc});
    })
})

// 获取用户列表
Router.get('/list', (req, res) => {
    const { type } = req.query;
    User.find({type}, (err, doc) => {
        return res.json({code: 0, data: doc});
    })
})

// 用户注册
Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body;
    User.findOne({user}, (err, doc) => {
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'});
        }

        const userModel = new User({user, type, pwd: utils.md5(pwd)});
        userModel.save((err, doc) => {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'});
            }
            const {user, type, _id} = doc;
            res.cookie('userid', doc._id);
            return res.json({code: 0, data: {user, type, _id}});
        })
    })
})

// 用户登录
Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: utils.md5(pwd)}, _filter, (err, doc) => { // {'pwd': 0}是设置pwd字段不显示（不返回） 
        if (!doc) {
            return res.json({code: 1, msg: '用户名或者密码错误'});
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc});
    })
})

// 用户完善信息
Router.post('/update', (req, res) => {
    const userid = req.cookies.userid;
    if (!userid) {
        return json.dumps({code: 1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body);
        return res.json({code: 0, data});
    })
})

// 获取聊天信息列表
Router.get('/getmsglist', (req, res) => {
    const user = req.cookies.userid;
    User.find({}, function(e, userdoc) {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        });

        Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users});
            }
        })
    })
})


module.exports = Router;