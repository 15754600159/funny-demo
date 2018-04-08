window.onload = () => {


    const button = document.querySelector('button');



    // normal
    button.addEventListener('click', () => {
        console.log('click');
    });
    // RxJS
    Rx.Observable.fromEvent(button, 'click')
        .subscribe(() => {
            console.log('rxjs click');
        });


    // normal
    let count = 0;
    button.addEventListener('click', () => {
        console.log(`click ${count++} times`);
    });
    // RxJS
    Rx.Observable.fromEvent(button, 'click')
        // scan 操作符的工作原理与数组的 reduce 类似
        .scan(count => count + 1, 0)
        .subscribe((count) => {
            console.log(`click ${count} times`);
        });


    // # 控制一秒钟最多点击一次
    // normal
    const rate = 1000;
    let count = 0,
        lastClickTime = Date.now() - rate;
    button.addEventListener('click', () => {
        if (Date.now() - lastClickTime >= rate) {
            console.log(`click ${count++} times`);
            lastClickTime = Date.now();
        };
    });
    // RxJS
    Rx.Observable.fromEvent(button, 'click')
        .throttleTime(1000)
        .scan(count => count + 1, 0)
        .subscribe(count => {
            console.log(`click ${count} times`);
        });


    // # 累加每次点击的鼠标X坐标
    // normal
    const rate = 1000;
    let count = 0,
        lastClickTime = Date.now() - rate;
    button.addEventListener('click', (event) => {
        if (Date.now() - lastClickTime >= rate) {
            count += event.clientX;
            console.log(count);
            lastClickTime = Date.now();
        };
    });
    // RxJS
    Rx.Observable.fromEvent(button, 'click')
        .throttleTime(1000)
        .map(event => event.clientX)
        .scan((count, clientX) => count + clientX, 0)
        .subscribe(count => console.log(count));


    // 推送多个值
    const observable = Rx.Observable.create((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        setTimeout(() => {
            observer.next(4);
            observer.complete();
        }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
        next: x => console.log(`got value ${x}`),
        error: err => console.error(`something wrong occurred: ${err}`),
        complete: () => console.log('done'),
    });
    console.log('just after subscribe');


    /**
     * @desc Observable 剖析
     * 1. 创建 const observable = Rx.Observable.create(func)
     * 2. 订阅 observable.subscribe(x => console.log(x));
     * 3. 执行 next*(error|complete)?
     * 4. 清理 subscription.unsubscribe();
     */
    const observable = Rx.Observable.create((observer) => {
        observer.next(1);
        setTimeout(() => {
            observer.next(2);
            observer.complete();
        }, 1000);
    });
    const subscription = observable.subscribe(x => console.log(x));
    // 稍后：
    subscription.unsubscribe();


    // subject (主体)
    const subject = new Rx.Subject();
    subject.subscribe((v) => console.log('observerA: ' + v));
    subject.subscribe((v) => console.log('observerB: ' + v));
    subject.next(1);
    subject.next(2);
    // Subjects 是将任意 Observable 执行共享给多个观察者的唯一方式
    const subject = new Rx.Subject();
    subject.subscribe((v) => console.log('observerA: ' + v));
    subject.subscribe((v) => console.log('observerB: ' + v));
    const observable = Rx.Observable.from([1, 2, 3]);
    observable.subscribe(subject);


    // BehaviorSubject 当前值
    const subject = new Rx.BehaviorSubject(0); // 0是初始值
    subject.subscribe((v) => console.log('observerA: ' + v));
    subject.next(1);
    subject.next(2);
    subject.subscribe((v) => console.log('observerB: ' + v)); // 订阅时会得到之前的值2
    subject.next(3);


    // ReplaySubject 将Observable的多个值回放给新的observer
    const subject = new Rx.ReplaySubject(3); // 为新的订阅者缓冲三个值； 还可以指定 window time (第二个参数，以毫秒为单位)来确定多久之前的值可以记录
    subject.subscribe((v) => console.log('observerA: ' + v));
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe((v) => console.log('observerB: ' + v));
    subject.next(5);


    // 实例操作符：Observable实例上的方法
    Rx.Observable.prototype.mutiplyByTen = function () {
        return Rx.Observable.create((observer) => {
            this.subscribe({
                next: v => observer.next(10 * v),
                error: err => observer.error(err),
                complete: () => observer.complete(),
            });
        });
    };
    Rx.Observable.from([1, 2, 3, 4])
        .mutiplyByTen()
        .subscribe(x => console.log(x));


    // 静态操作符：创建操作符(interval) 和 组合操作符(merge、combineLatest、concat等等)
    const observable = Rx.Observable.interval(1000 /* 毫秒数 */);

    const observable1 = Rx.Observable.interval(1000);
    const observable2 = Rx.Observable.interval(400);
    const merged = Rx.Observable.merge(observable1, observable2);




    // ----基础------------------------------------------------------------------------------------------------------------------------

    // 1. 转换成 observables
    // 来自一个或多个值
    Rx.Observable.of('foo', 'bar');

    // 来自数组
    Rx.Observable.from([1, 2, 3]);

    // 来自事件
    Rx.Observable.fromEvent(document.querySelector('button'), 'click');

    // 来自 Promise
    Rx.Observable.fromPromise(fetch('/users'));

    // 来自回调函数(最后一个参数得是回调函数，比如下面的 cb)
    // fs.exists = (path, cb(exists))
    var exists = Rx.Observable.bindCallback(fs.exists);
    exists('file.txt').subscribe(exists => console.log('Does file exist?', exists));

    // 来自回调函数(最后一个参数得是回调函数，比如下面的 cb)
    // fs.rename = (pathA, pathB, cb(err, result))
    var rename = Rx.Observable.bindNodeCallback(fs.rename);
    rename('file.txt', 'else.txt').subscribe(() => console.log('Renamed!'));


    // 2. 创建 observables
    // 在外部产生新事件
    var myObservable = new Rx.Subject();
    myObservable.subscribe(value => console.log(value));
    myObservable.next('foo');
    // 在内部产生新事件
    var myObservable = Rx.Observable.create(observer => {
        observer.next('foo');
        setTimeout(() => observer.next('bar'), 1000);
    });
    myObservable.subscribe(value => console.log(value));


    // 3. 控制流动
    // 输入 "hello world"
    var input = Rx.Observable.fromEvent(document.querySelector('input'), 'input');

    // 过滤掉小于3个字符长度的目标值
    input.filter(event => event.target.value.length > 2)
        .map(event => event.target.value)
        .subscribe(value => console.log(value)); // "hel"

    // 延迟事件
    input.delay(200)
        .map(event => event.target.value)
        .subscribe(value => console.log(value)); // "h" -200ms-> "e" -200ms-> "l" ...

    // 每200ms只能通过一个事件
    input.throttleTime(200)
        .map(event => event.target.value)
        .subscribe(value => console.log(value)); // "h" -200ms-> "w"

    // 停止输入后200ms方能通过最新的那个事件
    input.debounceTime(200)
        .map(event => event.target.value)
        .subscribe(value => console.log(value)); // "o" -200ms-> "d"

    // 在3次事件后停止事件流
    input.take(3)
        .map(event => event.target.value)
        .subscribe(value => console.log(value)); // "hel"

    // 直到其他 observable 触发事件才停止事件流
    var stopStream = Rx.Observable.fromEvent(document.querySelector('button'), 'click');
    input.takeUntil(stopStream)
        .map(event => event.target.value)
        .subscribe(value => console.log(value)); // "hello" (点击才能看到)


    // 4. 产生值
    // 输入 "hello world"
    var input = Rx.Observable.fromEvent(document.querySelector('input'), 'input');

    // 传递一个新的值
    input.map(event => event.target.value)
        .subscribe(value => console.log(value)); // "h"

    // 通过提取属性传递一个新的值
    input.pluck('target', 'value')
        .subscribe(value => console.log(value)); // "h"

    // 传递之前的两个值
    input.pluck('target', 'value').pairwise()
        .subscribe(value => console.log(value)); // ["h", "e"]

    // 只会通过唯一的值
    input.pluck('data').distinct()
        .subscribe(value => console.log(value)); // "helo wrd"

    // 不会传递重复的值
    input.pluck('data').distinctUntilChanged()
        .subscribe(value => console.log(value)); // "helo world"


    // 5. 创建应用
    var button = document.querySelector('button');
    Rx.Observable.fromEvent(button, 'click')
        // 对流进行 scan (reduce) 操作，以获取 count 的值
        .scan(count => count + 1, 0)
        // 每次改变时都在元素上设置 count
        .subscribe(count => document.querySelector('#count').innerHTML = count);


    // 6. 状态和存储
    // # 单个
    var increaseButton = document.querySelector('#increase');
    var increase = Rx.Observable.fromEvent(increaseButton, 'click')
        .map(() => state => Object.assign({}, state, { count: state.count + 1 }));

    // 我们使用初始状态创建了一个对象。每当状态发生变化时，我们会接收到改变状态的函数，
    // 并把状态传递给它。然后返回新的状态并准备在下次点击后再次更改状态。
    var state = increase.scan((state, changeFn) => changeFn(state), { count: 0 });

    // # 多个
    var increaseButton = document.querySelector('#increase');
    var increase = Rx.Observable.fromEvent(increaseButton, 'click')
        // 我们再一次映射到一个函数，它会增加 count
        .map(() => state => Object.assign({}, state, { count: state.count + 1 }));

    var decreaseButton = document.querySelector('#decrease');
    var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
        // 我们还是映射到一个函数，它会减少 count 
        .map(() => state => Object.assign({}, state, { count: state.count - 1 }));

    var inputElement = document.querySelector('#input');
    var input = Rx.Observable.fromEvent(inputElement, 'keypress')
        // 我们还将按键事件映射成一个函数，它会产生一个叫做 inputValue 状态
        .map(event => state => Object.assign({}, state, { inputValue: event.target.value }));

    // 我们将这三个改变状态的 observables 进行合并
    var state = Rx.Observable.merge(
        increase,
        decrease,
        input
    ).scan((state, changeFn) => changeFn(state), {
        count: 0,
        inputValue: ''
    });

    // 我们订阅状态的变化并更新 DOM
    state.subscribe((state) => {
        document.querySelector('#count').innerHTML = state.count;
        document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
    });

    // 为了优化渲染，我们可以检查什么状态是实际上已经发生变化了的
    var prevState = {};
    state.subscribe((state) => {
        if (state.count !== prevState.count) {
            document.querySelector('#count').innerHTML = state.count;
        }
        if (state.inputValue !== prevState.inputValue) {
            document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
        }
        prevState = state;
    });


};