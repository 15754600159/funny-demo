import axios from 'axios';
import { getRedirectPath } from '../util';

const LOAD_DATA = 'LOAD_DATA',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    ERROR_MSG = 'ERROR_MSG',
    initState = {
        redirectTo: '',
        isAuth: false,
        msg: '',
        user: '',
        pwd: '',
        type: '',
    };

// reducer 
export function user(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA: // 页面初始 判断登录状态
            return {...state, ...action.payload}
        case REGISTER_SUCCESS: // 注册成功
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: false, ...action.payload}
        case LOGIN_SUCCESS: // 登录成功
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case ERROR_MSG: // 信息报错
            return {...state, msg: action.msg, isAuth: false}
        default:
            return state;
    }
}

function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        payload: data,
    }
}

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    }
}

function errorMsg(msg) {
    return {
        msg,
        type: ERROR_MSG,
    }
}

export function loadData(userinfo) {
    return {
        type: LOAD_DATA,
        payload: userinfo,
    }
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同');
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}