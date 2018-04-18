/**
 * @desc 思路：action -> state -> dom操作view
 * 用immutable优化数据diff
 */

window.onload = () => {

    const initState = {
        count: 0,
        inputValue: null,
        queryData: null,
    },
        immutableState = Immutable.fromJS(initState);

    // 增加按钮点击事件
    const increaseButton = document.querySelector('.increase'),
        increase = Rx.Observable.fromEvent(increaseButton, 'click')
            .map(() => state => state.update('count', value => value + 1));
    // 减少按钮点击事件
    const decreaseButton = document.querySelector('.decrease'),
        decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
            .map(() => state => state.update('count', value => value - 1));
    // 输入框输入事件
    const inputElement = document.querySelector('.input'),
        input = Rx.Observable.fromEvent(inputElement, 'keyup')
            .map((event) => state => state.update('inputValue', value => event.target.value));
    // 请求数据按钮点击事件
    const queryButton = document.querySelector('.query');
    const query = Rx.Observable.fromEvent(queryButton, 'click')
        .map((event) => event.target.getAttribute('data-id'))
        .switchMap(id => {
            return Rx.Observable.fromPromise(axios.get('/data', {
                params: { id },
            }));
        })
        .map((queryData) => state => state.update('queryData', value => queryData.data.result));

    // 将三个改变状态的observables进行合并
    const state = Rx.Observable.merge(
        increase,
        decrease,
        input,
        query,
    ).scan((state, changeFn) => changeFn(state), immutableState);

    // 订阅状态的变化，更新DOM
    let prevState = immutableState;
    state.subscribe(state => {
        for (let [key, value] of state) {
            if (Immutable.is(state.get(key), prevState.get(key))) continue;
            const elmeList = document.querySelectorAll(`[data-bind="${key}"]`);
            for (let elem of elmeList) {
                elem.innerHTML = state.get(key);
            };
        };
        prevState = prevState.merge(state);
    });


};