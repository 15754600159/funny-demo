/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:25 
 * @Last Modified by:   果实o 
 * @Last Modified time: 2018-03-07 11:15:25 
 */
/**
 * 支持异步的dispatch
 */
const thunk = ({dispatch, getState}) => next => action => {
    // 如果action是函数，执行一下，参数是dispatch和getState
    if (typeof action === 'function') {
        return action(disatch, getState);
    }

    // 默认 什么都不干
    return next(action);
}

export default thunk;