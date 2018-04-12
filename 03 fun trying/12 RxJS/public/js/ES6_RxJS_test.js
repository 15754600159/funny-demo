/**
 * @desc 思路：action -> state -> dom操作view
 */

window.onload = () => {

    const initialState = {
        count: 0,
        inputValue: '',
    };

    const increaseButton = document.querySelector('.increase'),
        decreaseButton = document.querySelector('.decrease'),
        inputElement = document.querySelector('.input'),
        increase = Rx.Observable.fromEvent(increaseButton, 'click')
            .map(() => state => Object.assign({}, state, { count: state.count + 1 })),
        decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
            .map(() => state => Object.assign({}, state, { count: state.count - 1 })),
        input = Rx.Observable.fromEvent(inputElement, 'keypress')
            .map((event) => state => Object.assign({}, state, { inputValue: event.target.value }));

    // 将三个改变状态的observables进行合并
    const state = Rx.Observable.merge(
        increase,
        decrease,
        input,
    ).scan((state, changeFn) => changeFn(state), initialState);

    // 订阅状态的变化，更新DOM
    const prevState = {...initialState};
    state.subscribe(state => {
        if (state.count !== prevState.count) {
            document.querySelector('h1').innerHTML = state.count;
        };
        if (state.inputValue !== prevState.inputValue) {
            document.querySelector('h2').innerHTML = state.inputValue;
        };
        Object.assign(prevState, state);
    });


};