app.login = {
    pageContainer: '.login',
    url: 'pages/login/index.html',
    /** 必带属性 */
    state: Immutable.fromJS({
        count: 0,
        inputValue: null,
        queryData: null,
        chart: {
            a: 1,
            b: 2,
        },
        array: [],
    }),
    /** 必带属性 */
    observables: [],

    // 初始化页面
    init() {
        // 重置页面ajax计数器
        app.api.resetCount();
        // 初始化页面观察者
        this.initObservables();

        // action -> model -> view (this需要有state和observables属性)
        app.RxFn.mapAtoMtoV(this);
    },

    //全局刷新
    reset() { },

    // 初始化页面观察者
    initObservables() {
        // # 1. 事件注册
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
        const queryButton = document.querySelector('.query'),
            query = Rx.Observable.fromEvent(queryButton, 'click')
                .map((event) => event.target.getAttribute('data-id'))
                .switchMap(id => {
                    return Rx.Observable.fromPromise(app.api.example.view({ data: { id } }));
                })
                .map((queryData) => state => state.update('queryData', value => queryData.data.result));

        // array按钮点击事件
        const arrayButton = document.querySelector('.array'),
            array = Rx.Observable.fromEvent(arrayButton, 'click')
                .map(() => state => state.update('array', value => {
                    return value.push('sheng', 'aaa')
                }));

        // object按钮点击事件
        const objectButton = document.querySelector('.object'),
            object = Rx.Observable.fromEvent(objectButton, 'click')
                .map(() => state => state.update('chart', value => {
                    return value.set('a', 'aaa');
                }));

        // # 2. 加入事件队列
        this.observables.push(increase, decrease, input, query, array, object);

    },

    // 渲染列表数据
    arrayRender(elem, data) {
        console.log(elem, data);
    },

    // 渲染对象数据
    chartRender(elem, data) {
        console.log(elem, data);
    },

}
