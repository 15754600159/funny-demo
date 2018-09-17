/**
 * 功能：loading的状态
 * 作者：安超
 * 日期： 2018/3/27
 */

import { handleActions } from 'redux-actions'
import {
    SHOWLOADING_COMMON,
    HIDELOADING_COMMON,
} from '../actions/actionTypes'

const initialState = {
    show: false
}

export default handleActions({
    [SHOWLOADING_COMMON]() {
        return {
            show: true
        }
    },
    
    [HIDELOADING_COMMON]() {
        return {
            show: false
        }
    }
}, initialState)
