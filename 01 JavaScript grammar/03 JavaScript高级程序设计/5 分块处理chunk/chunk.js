function chunk(array, process, context){
    setTimeout(function(){
        var item = array.shift();
        process.call(context, item);

        if(array.length > 0){
            // callee是arguments对象的一个成员，它的值为“正被执行的Function对象”。
            // caller是函数对象的一个属性，该属性保存着调用当前函数的函数。
            setTimeout(arguments.callee, 100);
        }
    }, 100)
}