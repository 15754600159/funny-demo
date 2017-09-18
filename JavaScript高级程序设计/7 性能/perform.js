"use strict";

/*--------------------------------------------------------注意作用域------------------------------------------------------------------------------------------------------ */
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

// 2.避免使用with  with会创建自己的作用域，所以with里面执行的代码要慢些；


/*--------------------------------------------------------选择正确方法------------------------------------------------------------------------------------------------------ */
// 3.属性查找:使用变量和数组要比访问对象上的属性更有效率；

// 4.循环：
    // a.减值迭代：很多情况下循环中不断减值的迭代器更加高效
    // b.循环中避免属性的查找
    // c.消除循环：Duff 计算迭代次数为8的倍数，将一个循环展开为一系列数据，适合处理大型数据
    var itarations = Math.ceil(values.length / 8);
    var startAt = values.length % 8;
    var i = 0;

    do{
        switch(startAt){
            case 0: process(values[i++]);  //不用 break的话 会发生击穿现象，会执行到下面的case;
            case 7: process(values[i++]);
            case 6: process(values[i++]);
            case 5: process(values[i++]);
            case 4: process(values[i++]);
            case 3: process(values[i++]);
            case 2: process(values[i++]);
            case 1: process(values[i++]);
        }
        startAt = 0;
    } while(--iterations > 0);

// 5.避免双重解释：尽可能避免出现需要按照JavaScript解释的字符串，比如eval()函数

// 6.其他注意事项：
    // a.原生方法更快
    // b.switch语句较快：复杂的if else语句用switch替代
    // c.位运算较快


/*--------------------------------------------------------最小化语句数------------------------------------------------------------------------------------------------------ */
// 7.多个变量声明
    var count = 5;
    var color = 'blur';
    var value = [1,2,3];

    // 优化
    var count = 5,
        color = 'blur',
        value = [1,2,3];

// 8.插入迭代值：将迭代值插入最后使用它的语句中
    var name = value[i];
    i++;

    // 优化
    var name = value[i++];

// 9.使用数组和对象的字面量
    var values = new Array();
    values[0] = 123;
    values[1] = 456;
    values[2] = 789;

    var person = new Object();
    person.name = 'xiaoming';
    person.age = 12;
    person.say = function(){
        console.log('hi');
    }

    // 优化
    var values = [123, 456, 789];
    var person = {
        name: 'xiaoming',
        age: 12,
        say: function(){
            console.log('hi');
        }
    }
    

/*-----------------------------------------------------优化DOM交互--------------------------------------------------------------------------------------------------------- */
// 10.减少页面元素的更新次数
// 11.使用innerHTML比creatElement()和appendChild()快
// 12.事件代理：页面上事件处理程序的数量会影响页面的性能，所以利用事件冒泡在祖先元素上处理事件能提高页面性能
//      jquery 事件委托
//      $(el).on( events [, selector ] [, data ], handler(eventObject) )
// 13.注意HTMLCollections：发生以下情况时会返回HTMLCollections对象
    // a.进行了对getElemntsByTagName()的调用
    // b.获取元素的childNodes属性
    // c.获取了元素的attribute属性
    // d.访问了特殊集合 如document.forms、document.images等