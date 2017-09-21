// 1.cookies 4k以内 和服务器有交互的时候使用;



// 2.简单数据可利用html标签的data-*属性来存储;



// 3.本地存储 loacalStorage:永久 sessionStorage:页面关闭即删除

localStorage.setItem('name', 'shengxia');//新增记录
localStorage.getItem('name');//获取记录
localStorage.removeItem('name');//移除单个记录
localStorage.clear();//移除全部记录

// sessionStorage也可存储Json对象：存储时，通过JSON.stringify()将对象转换为文本格式；读取时，通过JSON.parse()将文本转换回对象。
var userEntity = {
    name: 'tom',
    age: 22
};
 
// 存储值：将对象转换为Json字符串
sessionStorage.setItem('user', JSON.stringify(userEntity));
 
// 取值时：把获取到的Json字符串转换回对象
var userJsonStr = sessionStorage.getItem('user');
userEntity = JSON.parse(userJsonStr);
console.log(userEntity.name); // => tom



// 4.离线缓存（application cache）

// 使用方法：
// ①配置manifest文件
// 页面上：
// <!DOCTYPE HTML>
// <html manifest="demo.appcache">
// ...
// </html>
// Manifest 文件：

// manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。

// manifest 文件可分为三个部分：

// ①CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存

// ②NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存

// ③FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）



// 5.web sql (标准化工作已停止)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); //打开数据库
db.transaction(function (tx) { //执行操作
   tx.executeSql('CREATE TABLE IF NOT EXISTS WIN (id unique, name)'); //建表
   tx.executeSql('INSERT INTO WIN (id, name) VALUES (1, "winty")'); // 插入数据
   tx.executeSql('INSERT INTO WIN (id, name) VALUES (2, "LuckyWinty")');
});
db.transaction(function (tx) { //读取数据
    tx.executeSql('SELECT * FROM WIN', [], function (tx, results) {
       var len = results.rows.length, i;
       msg = "<p>查询记录条数: " + len + "</p>";
       document.querySelector('#status').innerHTML +=  msg;
      
       for (i = 0; i < len; i++){
          alert(results.rows.item(i).name );
       }
      
    }, null);
 });



//  6.IndexedDB

//打开数据库
function openDB (name) {
    var request=window.indexedDB.open(name);
    request.onerror=function(e){
        console.log('OPen Error!');
    };
    request.onsuccess=function(e){
        myDB.db=e.target.result;
    };
}

var myDB={
    name:'test',
    version:1,
    db:null
};
openDB(myDB.name); 
// 添加数据
var students=[{ 
    id:1001, 
    name:"Byron", 
    age:24 
},{ 
    id:1002, 
    name:"Frank", 
    age:30 
},{ 
    id:1003, 
    name:"Aaron", 
    age:26 
}];
function addData(db,storeName){
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName); 

    for(var i=0;i<students.length;i++){
        store.add(students[i]);
    }
}


openDB(myDB.name,myDB.version);
setTimeout(function(){
    addData(myDB.db,'students');
},1000);
// 关闭数据库
function closeDB(db){
    db.close();
}
// 删除数据库
function deleteDB(name){
    indexedDB.deleteDatabase(name);
}