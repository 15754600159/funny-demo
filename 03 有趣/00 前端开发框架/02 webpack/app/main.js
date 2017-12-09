const greeter = require('./Greeter.js');

import './main.css';//使用require导入css文件
import './main.less';


document.querySelector("#root").appendChild(greeter());

console.log('打印');