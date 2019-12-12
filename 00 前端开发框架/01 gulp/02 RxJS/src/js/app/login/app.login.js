app.login = {
    pageContainer: '.login',
    url: 'pages/login/index.html',
    /** 必带属性: 页面数据 */
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
    /** 必带属性: 观察对象 */
    observers: [],

    // 初始化页面
    init() {
        // 重置页面ajax计数器
        app.api.resetCount();
        // 初始化页面观察者
        this.initObservers();

        // action -> model -> view (this需要有state和observers属性)
        app.RxFn.mapAtoMtoV(this);
    },

    //全局刷新
    reset() { },

    // 初始化页面观察者
    initObservers() {
        // # 1. 逻辑事件------------------------------------------------------------------------------
        // XX点击事件
        const button = document.querySelector('.increase');
        Rx.Observable.fromEvent(button, 'click')
            .subscribe(() => {
                console.log('rxjs click');
            });


        // # 2. 状态事件------------------------------------------------------------------------------
        // ## 1. 事件注册
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

        // ## 2. 加入事件队列
        this.observers.push(increase, decrease, input, query, array, object);

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
