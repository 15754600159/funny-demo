const express = require('express'),
    utils = require('utility'); // 密码加密

const model = require('./model'),
    User = model.getModel('user');

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
    User.find({}, (err, doc) => {
        return res.json(doc);
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

module.exports = Router;