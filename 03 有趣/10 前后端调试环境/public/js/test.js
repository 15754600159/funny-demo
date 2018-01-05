$(function() {

	// 1. 对象尽量静态化
		// bad
		const a = {};
		a.x = 3;
		// good: if reshape unavoidable(如果添加属性不可避免，要使用Object.assign方法)
		const a = {};
		Object.assign(a, {x:3});
		// good
		const a = {x: null};
		a.x = 3;

})