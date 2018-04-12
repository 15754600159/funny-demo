/**
 * immutable 教程
 */





/**
 * 1. immutable数据结构: Map
 */
const Map = Immutable.Map;

const obj1 = { a: 1, b: 2, c: { d: 1,}, };
const objMap1 = Immutable.fromJS(obj1);

// 1. 取值
console.log(objMap1.get('a'));
console.log(objMap1.getIn(['c', 'd']));
// 2. 修改 增加属性（生成新的Map）
const objMap2 = objMap1.set('a', 'aaa');
const objMap3 = objMap1.setIn(['c', 'd'], value => 'ddd');
// 3. 比较
console.log(objMap1 === objMap2);
console.log(Immutable.is(objMap1, objMap2));
console.log(Immutable.is(objMap1.get('c'), objMap2.get('c')));
// 4. 查看结构
console.log(objMap1.toJS());
console.log(objMap2.toJS());
console.log(objMap3.toJS());




/**
 * 2. immutable数据结构: List
 */
const List = Immutable.List;

const array1 = [1, 2, [3, 4]];
const arrayList1 = Immutable.fromJS(array1);

// // 1. 取值
console.log(arrayList1.get('0'));
console.log(arrayList1.getIn(['2', '0']));
// // 2. 修改 增加元素 （生成新的List）
const arrayList2 = arrayList1.set('0', 2);
const arrayList3 = arrayList1.setIn(['2', '1'], value => 'ddd');
const arrayList4 = arrayList1.update(0, value => 'aaa');
const arrayList5 = arrayList1.updateIn(['2', '1'], value => 'ddd');
// // 3. 比较
// console.log(arrayList1 === arrayList2);
// console.log(Immutable.is(arrayList1, arrayList2));
// console.log(Immutable.is(arrayList1.get('c'), arrayList2.get('c')));
// 4. 查看结构
console.log(arrayList1.toJS());
console.log(arrayList2.toJS());
console.log(arrayList3.toJS());
console.log(arrayList4.toJS());
console.log(arrayList5.toJS());


/**
 * 3. immutable: merge方法
 */
const Map1 = Immutable.fromJS({ a: 111, b: 222, c: { d: 333, e: 444 } });
const Map2 = Immutable.fromJS({ a: 111, b: 222, c: { e: 444, f: 555 } });

const Map3 = Map1.merge(Map2);
//Map {a:111,b:222,c:{e:444,f:555}}
const Map4 = Map1.mergeDeep(Map2);
//Map {a:111,b:222,c:{d:333,e:444,f:555}}
const Map5 = Map1.mergeWith((oldData, newData, key) => {
    if (key === 'a') {
        return 666;
    } else {
        return newData
    }
}, Map2);
//Map {a:666,b:222,c:{e:444,f:555}}