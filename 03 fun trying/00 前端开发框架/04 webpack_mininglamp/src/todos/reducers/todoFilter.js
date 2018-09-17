/**
 * 功能：过滤参数
 * 作者：安超
 * 日期： 2018/3/26
 */

import { handleActions } from 'framework'
import config from 'conf'
import * as actionTypes from '../actions/actionTypes'

const initialState = config.constant.VisibilityFilters.SHOW_ALL
const todoFilter = handleActions({
    [actionTypes.SET_VISIBILITY_FILTER](state, action) {
        return action.payload
    }
}, initialState)

export default todoFilter
