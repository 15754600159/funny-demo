/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:20 
 * @Last Modified by:   果实o 
 * @Last Modified time: 2018-03-07 11:15:20 
 */
export function createStore(reducer, middleware) {
    // 如果有中间件，则先用中间件修饰createStore
    if (middleware) {
        return middleware(createStore)(reducer);
    }

    let currentState = {};
    let currentListeners = [];

    function getState() {
        return currentState;
    }
    function subscribe(listener) {
        currentListeners.push(listener);
    }
    function dispatch(action) {
        currentState = reducer(currentState, action);
        currentListeners.forEach(v => v());
        return action;
    }
    dispatch({type: '@asdwadnsndjj'}); // 用于初始化state
    return { getState, subscribe, dispatch };
}

// 功能：增强diapatch函数
export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;
        
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        // dispatch = middleware(midApi)(store.dispatch); //单个中间件
        middlewareChain = middlewares.map(middleware => middleware(midApi));
        dispatch = compose(...middlewareChain)(stroe.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}

// compose(fn1, fn2, fn3)  ->    fn1(fn2(fn3))
export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((ret, item) => (...args) => ret(item(...args)));
}
