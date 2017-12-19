// 引入相关资源JS、CSS
import './header.js';

$(function() {
    
    const greeter = require('./greeter/Greeter.js');

    document.querySelector("#root").appendChild(greeter());
    
    $('body').append('<div>I am from jquery!</div>')
    
    console.log('打印');
    
})