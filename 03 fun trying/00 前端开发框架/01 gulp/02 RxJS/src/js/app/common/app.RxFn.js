/**
 * @desc RXJS 公共函数
 */

app.RxFn = {

    // 筛选出state中变化了的数据，渲染页面
    diffFn(state, prevState, pageObject) {
        const nativeState = state.toJS();
        let elmeList;
        for (let [key, value] of state) {
            if (Immutable.is(state.get(key), prevState.get(key))) continue;

            switch (this.getVariableType(nativeState[key])) {
                case 'Basic':
                    // console.log('Basic');
                    elmeList = document.querySelectorAll(`[data-bind="${key}"]`);
                    for (let elem of elmeList) {
                        elem.innerHTML = nativeState[key];
                    };
                    break;
                case 'Object':
                    // console.log('Object');
                    if (!pageObject[`${key}Render`]) {
                        console.warn(`<${pageObject.pageContainer}> 页面对象没有为数据${key}定义${key}Render方法!`);
                        return;
                    }
                    elmeList = document.querySelectorAll(`[data-bind="${key}"]`);
                    for (let elem of elmeList) {
                        pageObject[`${key}Render`](elem, nativeState[key])
                    };
                    break;
                default:
                    console.log('未知变量类型');
            }

        };
        prevState = prevState.merge(state);
        return prevState;
    },

    // 绑定 action -> state -> view
    mapAtoMtoV(pageObject) {
        if (!pageObject.state || !pageObject.observables) {
            console.warn(`<${pageObject.pageContainer}> 页面对象没有定义属性 state 或者 observables!`);
            return;
        };

        let { state: prevState, observables } = pageObject;
        // 事件合并
        const stream = Rx.Observable.merge(...observables)
            .scan((state, changeFn) => changeFn(state), prevState);

        // 避免重复监听
        if (pageObject.subscription) return;

        // 订阅状态的变化，更新DOM
        pageObject.subscription = stream.subscribe(state => {
            prevState = this.diffFn(state, prevState, pageObject);
        });

    },

    // 区分数据类型
    getVariableType(variable) {
        let type = '';
        if (typeof (variable) === 'object') {
            type = 'Object';
        } else {
            type = 'Basic';
        }
        return type;
    },

}