// 1.传统继承
// function SuperType(name){
// 	this.name = name;
// 	this.color = ['red', 'blue', 'green'];
// }

// SuperType.prototype.sayName = function(){
// 	console.log(this.name);
// };

// function SubType(name, age){
// 	SuperType.call(this, name);                  //第二次调用SuperType
// 	this.age = age;
// }

// SubType.prototype = new SuperType();         //第一次调用SuperType
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function(){
// 	console.log(this.age);
// }

// var subtype = new SubType('shengxai', 18);
// console.log(subtype);




// 2.寄生组合式继承
function inheritPrototype(subType, superType){
	var prototype = Object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function SuperType(name){
	this.name = name;
	this.color = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function(){
	console.log(this.name);
};

function SubType(name, age){
	SuperType.call(this, name);                  //第一次调用SuperType
	this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
	console.log(this.age);
}

var subtype = new SubType('shengxai', 18);
console.log(subtype);