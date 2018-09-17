/**
 * 功能：所有动作配置
 * 作者：安超
 * 日期： 2018/3/19
 */

import { createAction, createActions } from 'framework'
import * as actionTypes from './actionTypes'

const actionCreator = createActions({
    login: {
        url: '/api/login',
        method: 'post'
    },
    logout: {
        url: '/api/logout'
    },
    getUserInfo: {
        url: '/api/getUserInfo',
        actionType: actionTypes.SET_USER_INFO_LOGIN
    },
    setUserInfo: createAction(actionTypes.SET_USER_INFO_LOGIN)
})

export default actionCreator
