import { createStore } from './myRedux';

// reducer
function counter(state = 0, action) {
    switch (action.type) {
        case '加机关枪':
            return state + 1;
        case '减机关枪':
            return state - 1;
        default:
            return 10;
    }
}

const store = createStore(counter);

const init = store.getState();

function listener() {
    const current = store.getState();
    console.log(`现在有${current}把`);
}

// 订阅，每次修改state，都会执行listener
store.subscribe(listener);

store.dispatch({ type: '加机关枪' });
store.dispatch({ type: '加机关枪' });
store.dispatch({ type: '减机关枪' });
store.dispatch({ type: '减机关枪' });