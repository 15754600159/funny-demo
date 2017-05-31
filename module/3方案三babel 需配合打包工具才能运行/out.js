/**
 *require语法还是有问题
 * Babel 所做的只是帮你把‘ES6 模块化语法’转化为‘CommonJS 模块化语法’，其中的require exports 等是 CommonJS 在具体实现中所提供的变量。
 * 任何实现 CommonJS 规范的环境（如 node 环境）可以直接运行这样的代码，而浏览器环境并没有实现对 CommonJS 规范的支持，所以我们需要使用打包工具（bundler）来进行打包，说的直观一点就是
 * 把所有的模块组装起来，形成一个常规的 js 文件。
 * 常用的打包工具包括 browserify webpack rollup 等。
 */

'use strict';

var _a = require('a');

var _b = require('b');

// import {firstName, lastName, year} from './profile';
alert('aaa');


console.log(_a.name);
