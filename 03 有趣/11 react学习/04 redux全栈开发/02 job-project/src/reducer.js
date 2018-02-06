// 合并所有reducer
import { combineReducers } from 'redux';

export default combineReducers({counter});

function counter(state = 0, action) {
    switch(action.type) {
        case 'ADD_GUN':
            return state + 1;
        default:
            return 10;
    }
}
