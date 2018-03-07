/**
 * 支持action数组
 */
const arrayThunk = ({dispatch, getState}) => next => action => {
    // 如果action是数组，则进行相关操作
    if (Array.isArray(action)) {
        return action.forEach(v => dispatch(v));
    }

    // 如果如果action不是数组，则直接执行下一个中间件
    return next(action);
}

export default thunk;