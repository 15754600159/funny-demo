## 原生JavaScript
1. 选择器时态问题 
    ```
    var elem = document.getElementsByClassName('div');//能选中未来的元素
    var elem = document.querySelectorAll('.div');//不能选中未来的元素
    var elem = $('.div');//不能选中未来的元素
    // 绑定未来元素
    $(document).on('click', '.class', function(){})
    ```
2. null和undefined
    - 最初版本：null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的 原始值，转为数值时为NaN。
    - 现在：null表示"没有对象"，即该处不应该有值。undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。
3. if(word){} //不要用这样的形式检查word是否为空值，因为0的时候也是false
4. 值检验：
    -  如果值是一个引用类型，使用instanceof检查其构造函数
    -  如果值是一个基本类型，使用typeof检查其类型
5. e.currentTarget指的是注册了事件监听器的对象，而e.target指的是该对象里的子对象，也是触发这个事件的对象。
6. 数组的遍历操作方法：filter()、map()、some()、every()、forEach()、lastIndexOf()、indexOf()
7. 四种常见的 POST 提交数据方式：
    - application/x-www-form-urlencoded
    - multipart/form-data
    - application/json
    - text/xml
8. 解耦JS/CSS JS操作class
    - 给大容器div或者body添加不同状态的class，来控制不同分屏元素的显隐；
9. input[type = 'file'] [上传多个文件](http://blog.csdn.net/qq_35278280/article/details/51919086/)
10. [setTimeout详解](http://mp.weixin.qq.com/s/poxACQftbiXg2ePtfTrkkQ)
    1. 浏览器的内核是多线程的，它们在内核控制下相互配合以保持同步，一个浏览器至少实现三个常驻线程：JavaScript引擎线程，GUI渲染线程，浏览器事件触发线程：

        a. JavaScript引擎是基于事件驱动单线程执行的，JavaScript引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JavaScript线程在运行JavaScript程序。  
        b. GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(Reflow)时，该线程就会执行。但需要注意，GUI渲染线程与JavaScript引擎是互斥的，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行。  
        c. 事件触发线程，当一个事件被触发时，该线程会把事件添加到待处理队列的队尾，等待JavaScript引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeout、也可来自浏览器内核的其他线程如鼠标点击、Ajax异步请求等，但由于JavaScript的单线程关系，所有这些事件都得排队等待JavaScript引擎处理（当线程中没有执行任何同步代码的前提下才会执行异步代码）。
    
    2. setTimeout(fn, 0) 用处就在于我们可以改变任务的执行顺序！
    
        ```
        setTimeout(function(){
          // statement
        }, 0);
        ```
    3. setTimeout中回调函数的this  
    a. 由于setTimeout() 方法是浏览器 window 对象提供的，因此第一个参数函数中的this其实是指向window对象，这跟变量的作用域有关。  
    b. 不过我们可以通过使用bind()方法来改变setTimeout回调函数里的this
        
        ```
        var a = 1;   
        var obj = {   
          a: 2,   
          test: function() {   
            setTimeout(function(){   
              console.log(this.a);   
            }.bind(this), 0);   
          }   
        };   
        obj.test();  //  2
        ```
    4. setTimeout不止两个参数  
    setTimeout可以传入第三个参数、第四个参数,用来表示第一个参数（回调函数）传入的参数。
    
        ```
        setTimeout(function(a, b){   
          console.log(a);   // 3
          console.log(b);   // 4
        },0, 3, 4);
        ```
11. 作用域链是在函数定义的时候确定的，作用域中变量的值（执行上下文）是在执行过程中产生的确定的。
12. postMessage解决不同iframe之间的参数传递
    ```
    // a页面 （!!!注意：window.frames[0]是目标iframe，是信息接收方，而不是信息发送方）
    window.frames[0].postMessage('getcolor','http://lslib.com');
    // b页面
    window.addEventListener('message',function(e){
        if(e.source!=window.parent) return;
        var color=container.style.backgroundColor;
        window.parent.postMessage(color,'*');
    },false);   
    ``` 
13. 解决路径跳转中文乱码的问题： encodeURI(url) decodeURI(url)
14. console正确打开方式：
    ```
    console.log("log");
    console.log("%d年%d月%d日", 2015, 09, 22);
    
    console.debug("debug");
    console.info("info");
    console.warn("warn");
    console.error("error");
    
    // 输出表格
    const people = {
        "person1": {"fname": "san", "lname": "zhang"}, 
        "person2": {"fname": "si", "lname": "li"}, 
        "person3": {"fname": "wu", "lname": "wang"}
    };
    console.table(peopl);
    
    // 测试性能
    console.time("for-test");
    // some codde...
    console.timeEnd("for-test");
    
    // 记录代码被执行次数
    function func() {
        console.count("label");
    }
    for(let i = 0; i < 3; i++) {
        func();
    }
    ```
## jQuery
1. jQuery的attr()对应的是html文本；prop()对应的是DOM对象;
2. jQuery中each类似于javascript的for循环  
但不同于for循环的是在each里面不能使用break结束循环，也不能使用continue来结束本次循环，想要实现类似的功能就只能用return,  
break        用return false  
continue      用return true
3. [jQuery数据缓存和HTML5 data-*属性](http://note.youdao.com/)
    1. jQuery读取data-*会自动做数据类型转换，如果不想要这种转换只能使用attr()去获取原始的属性值。
    2. jQuery读取data-*属性是懒惰的、按需的，只有真正使用这些属性的时候，jQuery才会将其加载到内存。
    3. jQuery修改属性值，都是在内存中进行的，并不会修改 DOM。(通过js中的dataset修改时候，会刷新DOM)
    4. data-*会被jQuery绑定到HTMLElement对象上，而不是jQuery封装后的对象上。
    5. 最重要的一点：jQuery只会在data-*第一次被访问的时候将其加载到内存，之后再也不会重新读取了。
4. 问题：jQuery prop改变checkbox状态不能出发change事件；  
解决：添加change()，让它触发$("input[type='checkbox']").prop('checked', true).change();
