import axios from 'axios';

const ADD_GUN = '加机关枪',
    REMOVE_GUN = '减机关枪';

// reducer
export function counter(state = 0, action) {
    switch(action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    }
}

// action creator
export function addGUN() {
    return { type: ADD_GUN };
}
export function removeGUN() {
    return { type: REMOVE_GUN };
}
export function addGUNAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGUN());
        }, 2000)
    }
}
export function getData() {
    return dispatch => {
        axios.get('/data')
            .then(res => {
                console.log(res);
            });
    }
}