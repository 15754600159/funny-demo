/**
 * ES6模块语法直接转换成浏览器可用  （ES6 -> ES2015(commonJS) -> browserify打包浏览器能识别）
 * gulp 是任务运行环境，用来进行任务调度
 * browserify 用来 require js 的模块
 * vinyl-source-stream 把 browserify 输出的数据进行准换，使之流符合 gulp 的标准
 * babelify 本来的主要作用是进行 ES6 的编译，但是我们这里是使用它的 JSX 编译功能
 */
var gulp = require("gulp");
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var babelify = require("babelify");


gulp.task('browserify', function(){
  return browserify('./src/main.js')
         .transform(babelify)
         .bundle()
         .pipe(source('bundle.js'))
         .pipe(gulp.dest('final/'));
});







// 这个是 ES6 转 ES2015 语法的方法
var babel = require("gulp-babel");
gulp.task("ES6transfer", function() {
    return gulp.src("src/*.js")
        .pipe(babel())
        .pipe(gulp.dest("lib"));
});
