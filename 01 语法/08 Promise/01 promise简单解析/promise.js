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
    let value = null,
        callback = []; //可能有多个回调

    this.then = function(onFullFilled) {
        callback.push(onFullFilled);
    };

    function resolve(value) {
        callback.forEach(function(callback) {
            callback(value);
        })
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