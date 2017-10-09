/**
 * 1. element.addEventListener(event, function, useCapture);  ------(事件默认注册在事件冒泡阶段)
 *      
 *      ---useCapture	可选。布尔值，指定事件是否在捕获或冒泡阶段执行。
 *      可能值:
 *      true - 事件句柄在捕获阶段执行
 *      false- false- 默认。事件句柄在冒泡阶段执行
 * 
 * 2. e.stopPropagation(); 可以中断事件的传播(并非只是冒泡)
 *      如果事件event注册在事件捕获阶段，则后半段的捕获、目标阶段、冒泡阶段 都将不再执行
 * 
 * 3. e.preventDefault(); 阻止事件的默认行为
 */

window.onload = function(){

    var outer = document.querySelector('.outer'),
        middle = document.querySelector('.middle'),
        inner = document.querySelector('.inner');

    outer.addEventListener('click', function(e){
        console.log('outer');
    });
    middle.addEventListener('click', function(e){
        console.log('middle');
        e.stopPropagation();
    }, true);
    inner.addEventListener('click', function(e){
        console.log('inner');
    });
}