// gulp-prefix is my-plugin

var gulp = require('gulp'),
	prefix = require('gulp-test-plugin-guoshi');

gulp.task("default", function(){
    gulp.src("src/*.js")
        .pipe(prefix("// 我是果实o，你好！ \n"))
        .pipe(gulp.dest("dist/"));
});
