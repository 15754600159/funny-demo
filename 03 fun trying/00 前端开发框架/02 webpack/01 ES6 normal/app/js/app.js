// css

// 引入mine的JS、CSS
import '../css/main.css';//使用require导入css文件
import '../less/main.less';

window.onload = () => {

    // test
    const greeter = require('./greeter/Greeter.js');

    document.querySelector("#root").appendChild(greeter());
    
    
    console.log('打印');

}    