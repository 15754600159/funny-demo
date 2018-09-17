/**
 * 功能：过滤参数
 * 作者：安超
 * 日期： 2018/3/26
 */
import { combineReducers } from 'framework/Util'
import todoList from './todoList'
import todoFilter from './todoFilter'

export default combineReducers({
    todoFilter,
    todoList
})
