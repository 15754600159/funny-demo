/**
 * 功能：所有状态
 * 作者：安超
 * 日期：2018/7/4
 */
import { handleActions } from 'framework'
import * as actionTypes from '../actions/actionTypes'
import * as actionTypesPublic from '@/actions/actionTypes'

const inintialState = {
    username: '',
    userType: actionTypes.USER_TYPE[0],
    timestamp: ''
}

const loginReducer = handleActions({
    [actionTypes.SET_USER_INFO_LOGIN]: {
        success: (state, action) => {
            const { username, userType } = action.payload
            return {
                ...state,
                username,
                userType: actionTypes.USER_TYPE[parseInt(userType, 10)]
            }
        }
    },
    [actionTypesPublic.SET_USERTIMESTAMP_PUBLIC](state, action){
        return {
            ...state,
            timestamp: action.payload
        }
    }
}, inintialState)

export default loginReducer
