export function createStore(reducer) {
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