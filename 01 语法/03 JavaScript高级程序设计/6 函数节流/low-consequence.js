function throttle(method, context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    }, 100);
}

function resizeDiv(){
    var div = document.getElementById('myDiv');
    div.style.height = div.offsetWidth + 'px';
}

window.onresize = function(){
    throttle(resizeDiv);//避免过于频繁的操作DOM元素
}