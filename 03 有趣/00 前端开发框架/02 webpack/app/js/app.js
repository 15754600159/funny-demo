// css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// 引入mine的JS、CSS
import '../css/main.css';//使用require导入css文件
import '../less/main.less';

$(function() {
    
    const greeter = require('./greeter/Greeter.js');

    document.querySelector("#root").appendChild(greeter());
    
    $('body').append('<div>I am from jquery!</div>')
    
    console.log('打印');
    
})