/**
 * 功能：弹窗的状态
 * 作者：安超
 * 日期： 2018/3/27
 */

import { handleActions } from 'redux-actions'
import {
    SHOWDIALOG_COMMON,
    HIDEDIALOG_COMMON,
} from '../actions/actionTypes'

const initialState = {
    title: '',
    content: null,
    width: 500,
    dialogType: 'confirm',
    show: false,
    footer: []
}

export default handleActions({
    [SHOWDIALOG_COMMON](state, action) {
        return {
            ...state,
            ...action.payload,
            show: true
        }
    },
    
    [HIDEDIALOG_COMMON](state) {
        return {
            ...state,
            title: '',
            content: null,
            show: false,
        }
    }
}, initialState)
