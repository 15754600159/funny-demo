/*
 * @Author: 果实o 
 * @Date: 2017-12-09 16:27:28 
 * @Last Modified by: 果实o
 * @Last Modified time: 2017-12-09 16:39:48
 */

/**
 * 1. 博客：https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/
 */

function MyPromise(fn) {
    let state = 'pending',
        value = null,
        callback = []; //可能有多个回调

    this.then = function(onFullFilled) {
        if (state = 'pending') {
            callback.push(onFullFilled);
            return this;
        }
        onFullFilled(value);
        return this;
    };

    function resolve(newValue) {
        value = newValue;
        state = 'resolve';
        setTimeout(function() { // 保证在resolve执行之前，then方法已经注册完所有的回调。
            callback.forEach(function(callback) {
                callback(value);
            })
        }, 0);
    };

    fn(resolve);
}


function getUserName() {
    return new MyPromise(function(resolve) {
        setTimeout(function() {
            let name = 'guoshi';
            resolve(name);
        }, 2000)
    })
}

getUserName().then(function(name) {
    console.log('name: ' + name);
})