/**
 * 1. 入门: http://www.jianshu.com/p/42e11515c10f
 * 2. API：https://doc.webpack-china.org/concepts/
 */

// const greeter = require('./Greeter.js');

// document.querySelector('#root').appendChild(greeter());
// console.log('11122233')


// ES6, react语法
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css'; //使用require导入css文件

render(<Greeter />, document.getElementById('root'));