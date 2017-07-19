"use strict";

// 1.减少全局查找

// 全局查询需要随着作用域链不但往上查找变量，所以比访问当前作用域的变量更消耗时间
function updateUI(){
    var imgs = document.getElementsByTagName('img');//1次
    for (var i = 0, len = imgs.length; i < len; i++){
        img[i].title = document.title + " image " + i;//很多次
    }
    var msg = document.getElementById('msg');//1次
    msg.innerHTML = 'Update complete.';
}

// 改进:将document对象存储在本地的doc变量中，现在就只要一次的全局查找
function updateUI(){
    var doc = document;
    var imgs = doc.getElementsByTagName('img');//1次
    for (var i = 0, len = imgs.length; i < len; i++){
        img[i].title = doc.title + " image " + i;//很多次
    }
    var msg = doc.getElementById('msg');//1次
    msg.innerHTML = 'Update complete.';
}