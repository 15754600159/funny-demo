// $(function () {

// })

var a = { b: 1 };

function foo(obj) {
    obj.b = 2;
    obj = {c: 2};
}

foo(a);
console.log(a);