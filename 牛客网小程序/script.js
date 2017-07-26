// 1.返回元素在数组中的位置
function indexOf(arr, item) {
    let index = -1;
    for (let i = 0, j = arr.length; i < j; i++) {
        if (arr[i] === item) {
            index = i;
        }
    }
    return index;
}

// console.log(indexOf([ 1, 2, 3, 4 ], 3))


// 2.数组求和
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
function sum(arr) {
    return arr.reduce(function (total, currentValue) {
        return total + currentValue;
    })
}

// console.log(sum([1,2,3,4]));

// 3.移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
// function remove(arr, item) {
//     var newArray = [];
//     for(var i = 0, j = arr.length; i < j; i++){
//         if(arr[i] !== item){
//             newArray.push(arr[i]);
//         }
//     }
//     return newArray;
// }

// 更优雅的方法
function remove(arr, item) {
    return arr.filter(function (elem, index, array) {
        return elem !== item;
    })
}

// console.log(remove([1, 2, 3, 4, 2], 2));

// 4.移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
function removeWithoutCopy(arr, item) {
    for (var i = 0, j = arr.length; i < j; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

// console.log(removeWithoutCopy([1, 2, 3, 4, 2], 2));

// 5.找出数组 arr 中重复出现过的元素
// function duplicates(arr) {
// 	var repeat = [];
//     var count = [];
//     var repeatArray = [];
//     for(var i = 0, j =  arr.length; i < j; i++){
//         var index = repeat.indexOf(arr[i]);
//         if(index < 0){
//             repeat.push(arr[i]);
//             count.push(1);
//         }else{
//             count[index]++;
//         }
//     }
//     for(var i = 0, j = count.length; i < j; i++){
//         if(count[i] > 1){
//             repeatArray.push(repeat[i]);
//         }
//     }
//     return repeatArray;
// }

// 更优雅
function duplicates(arr){
    var result = [];
    arr.forEach(function(elem){
        if(arr.indexOf(elem) !== arr.lastIndexOf(elem) && result.indexOf(elem) < 0){
            result.push(elem);
        }
    });
    return result;
}

// console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]))

// 6.函数联级调用 
function functionFunction(){
    var argus = Array.prototype.slice.call(arguments, 0);
    var curryFunc = function(){
        argus = argus.concat(Array.prototype.slice.call(arguments, 0));
        return curryFunc;
    }
    curryFunc.toString = function(){
        return argus.join(', ');
    }
    return curryFunc;
}

console.log(functionFunction(1)(2)(3,4).toString())
