/* global require:false */
'use strict';

var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var sass = require('gulp-sass');
var fileInclude = require('gulp-file-include');
var htmlmin = require('gulp-htmlmin');
var zip = require('gulp-zip');
var connect = require('gulp-connect');
var open = require('gulp-open');
var prettify = require('gulp-jsbeautifier');
var babel = require('gulp-babel');
var del = require('del');
var runSequence = require('run-sequence');
var proxy = require('http-proxy-middleware');

var path = require('path');
var fs = require('fs');

var modules = require('./modules.json');

var modulesSize = Object.getOwnPropertyNames(modules).length;

var paths = {
	root: './',
	source: {
		root: 'src/'
	},
	dist: {
		root: 'dist/',
		css: 'dist/css/',
		js: 'dist/js/'
	},
	release: {
		root: 'release/'
	}
};


/*
 * ================================= 配置 =================================
 */
var settings = require('./settings.default.json');
if (fs.existsSync('./settings.json')) {
	var customSettings = require('./settings.json');
	for ( var name in customSettings) {
		settings[name] = customSettings[name];
	}
}


/*
 * ================================= data:替换变量数据 =================================
 */
var dataJson;
gulp.task('data-dev', function(cb) {
	dataJson = {};
	for (var item in modules) {
		dataJson[item + '-version'] = '';
	}
	cb();
});

gulp.task('data', function(cb) {
	dataJson = {};
	for (var item in modules) {
		dataJson[item + '-version'] = '.min-' + modules[item].version;
	}
	cb();
});


/*
 * ================================= js =================================
 */
/**
 * 合并js文件
 */
gulp.task('js:concat', function(cb) {
	var cbs = 0;
	var callback = function() {
		cbs++;
		if (cbs === modulesSize) {
			cb();
		}
	};

	for (var item in modules) {
		gulp.src(modules[item].jsFiles).pipe(concat(item + '.js')).pipe(gulp.dest(paths.dist.js)).on('end', callback);
	}
});

/**
 * Babel
 */
gulp.task('js:babel', function(cb) {
	gulp.src(['js/app*.js'], {
		cwd: paths.dist.root,
		base: paths.dist.root
	}).pipe(babel()).pipe(gulp.dest(paths.dist.root)).on('end', cb);
});

/**
 * 替换js文件中的变量
 */
gulp.task('js:replace', function(cb) {
	gulp.src(['js/app*.js'], {
		cwd: paths.dist.root,
		base: paths.dist.root
	}).pipe(fileInclude({
		context: dataJson
	})).pipe(gulp.dest(paths.dist.root)).on('end', cb);
});

/**
 * 压缩js文件
 *
 * 1. uglify<br>
 * 2. rename .min-版本号
 */
gulp.task('js:min', function(cb) {
	var cbs = 0;
	var callback = function() {
		cbs++;
		if (cbs === modulesSize) {
			cb();
		}
	};

	// js压缩选项
	var options = {
		compress: {
			drop_console: true,
			drop_debugger: true
		}
	};

	var process = function(item, modules) {
		gulp.src([paths.dist.js + item + '.js']).pipe(uglify(options)).pipe(rename(function(path) {
			path.basename = path.basename + '.min-' + modules[item].version;
		})).pipe(gulp.dest(paths.dist.js)).on('end', callback);
	};

	for (var item in modules) {
		process(item, modules);
	}
});

gulp.task('js-dev', function(cb) {
	runSequence('data-dev', 'js:concat', 'js:replace', cb);
});
gulp.task('js', function(cb) {
	runSequence('data', 'js:concat', 'js:babel', 'js:replace', 'js:min', cb);
});


/*
 * ================================= css =================================
 */
/**
 * less文件处理
 */
gulp.task('less', function(cb) {
	var cbs = 0;
	var callback = function() {
		cbs++;
		if (cbs === modulesSize) {
			cb();
		}
	};

	var process = function(item, modules) {
		if (modules[item].lessFiles && modules[item].lessFiles.length) {
			gulp.src(modules[item].lessFiles).pipe(less({
				paths: [path.join(__dirname, 'less', 'includes')]
			})).pipe(rename(function(path) {
				path.basename = item + '.less.' + path.basename;
			})).pipe(gulp.dest(paths.dist.css)).on('end', callback);
		} else {
			callback();
		}
	};

	for (var item in modules) {
		process(item, modules);
	}
});

/**
 * sass文件处理
 */
gulp.task('sass', function(cb) {
	var cbs = 0;
	var callback = function() {
		cbs++;
		if (cbs === modulesSize) {
			cb();
		}
	};

	var process = function(item, modules) {
		if (modules[item].sassFiles && modules[item].sassFiles.length) {
			gulp.src(modules[item].sassFiles).pipe(sass()).pipe(rename(function(path) {
				path.basename = item + '.sass.' + path.basename;
			})).pipe(gulp.dest(paths.dist.css)).on('end', callback);
		} else {
			callback();
		}
	};

	for (var item in modules) {
		process(item, modules);
	}
});

/**
 * 合并css文件
 */
gulp.task('css:concat', function(cb) {
	var cbs = 0;

	var callback = function() {
		cbs++;
		if (cbs === modulesSize) {
			cb();
		}
	};

	var process = function(item, modules) {
		var cssFiles = [];
		if (modules[item].cssFiles && modules[item].cssFiles.length) {
			cssFiles = cssFiles.concat(modules[item].cssFiles);
		}
		cssFiles.push(paths.dist.css + item + '.less.*.css');
		cssFiles.push(paths.dist.css + item + '.sass.*.css');
		gulp.src(cssFiles).pipe(concat(item + '.css')).pipe(gulp.dest(paths.dist.css)).on('end', callback);
	};

	for (var item in modules) {
		process(item, modules);
	}
});

/**
 * 压缩css文件
 *
 * 1. uglify<br>
 * 2. rename .min-版本号
 */
gulp.task('css:min', function(cb) {
	var cbs = 0;
	var callback = function() {
		cbs++;
		if (cbs === modulesSize) {
			cb();
		}
	};

	// css压缩选项
	var options = {
		rebase: false,
		merging: false
	};

	var process = function(item, modules) {
		gulp.src([paths.dist.css + item + '.css']).pipe(cleanCSS(options)).pipe(rename(function(path) {
			path.basename = path.basename + '.min-' + modules[item].version;
		})).pipe(gulp.dest(paths.dist.css)).on('end', callback);
	};

	for (var item in modules) {
		process(item, modules);
	}
});

gulp.task('css-dev', function(cb) {
	runSequence(['less', 'sass'], 'css:concat', cb);
});
gulp.task('css', function(cb) {
	runSequence(['less', 'sass'], 'css:concat', 'css:min', cb);
});


/*
 * ================================= html =================================
 */
gulp.task('html:includereplace', function(cb) {
	gulp.src(['pages/**', 'index.html', '!**/@*.html'], {
		cwd: paths.source.root,
		base: paths.source.root
	}).pipe(fileInclude({
		context: dataJson
	})).pipe(gulp.dest(paths.dist.root)).on('end', cb);
});

gulp.task('html:min', function(cb) {
	// html压缩选项
	var options = {
		removeComments: true,
		collapseWhitespace: true
	};

	gulp.src(['**/*.html'], {
		cwd: paths.dist.root,
		base: paths.dist.root
	}).pipe(htmlmin(options)).pipe(gulp.dest(paths.dist.root)).on('end', cb);
});

gulp.task('html-dev', function(cb) {
	runSequence('data-dev', 'html:includereplace', cb);
});
gulp.task('html', function(cb) {
	runSequence('data', 'html:includereplace', 'html:min', cb);
});


/*
 * ================================= 图片，字体等其他文件 =================================
 */
gulp.task('others', function(cb) {
	var cbs = 0;
	var size = 2;
	var callback = function() {
		cbs++;
		if (cbs === size) {
			cb();
		}
	};

	if(settings.copySrcFiles) {
		var copyPaths = [];
		settings.copySrcFiles.forEach(function(item){
			copyPaths.push(paths.source.root + item);
		});

		gulp.src(copyPaths, {
			base: paths.source.root
		}).pipe(gulp.dest(paths.dist.root)).on('end', cb);
	}
});


/*
 * ================================= clean =================================
 */
gulp.task('clean:dist', function() {
	return del(paths.dist.root + '*');
});
gulp.task('clean:release', function() {
	return del(paths.release.root + '*');
});


/*
 * ================================= dist =================================
 */
gulp.task('dist-dev', function(cb) {
	runSequence('clean:dist', ['js-dev', 'css-dev', 'html-dev', 'others'], cb);
});
gulp.task('dist', function(cb) {
	runSequence('clean:dist', ['js', 'css', 'html', 'others'], cb);
});


/*
 * ================================= server =================================
 */
gulp.task('watch', function() {
	gulp.watch([paths.source.root + '**', 'modules.json'], function() {
		runSequence('dist-dev', 'reload');
	});
});

gulp.task('connect', function() {
	connect.server({
		root: paths.dist.root,
		livereload: {
			port: settings.port + 1
		},
		port: settings.port,
		middleware: function() {
			var result = [];

			// http代理
			var httpProxy = settings.httpProxy;
			if(httpProxy) {
				httpProxy.forEach(function(item){
					var proxyItem = proxy(item.path, {
						target: item.server,
						changeOrigin: true,
						logLevel: 'debug'
					});
					result.push(proxyItem);
				});
			}

			// websocket代理
			var wsProxy = settings.wsProxy;
			if(wsProxy) {
				wsProxy.forEach(function(item){
					var proxyItem = proxy(item.path, {
						target: item.server,
						changeOrigin: true,
						ws: true,
						logLevel: 'debug'
					});
					result.push(proxyItem);
				});
			}

			return result;
		}
	});
});
gulp.task('reload', function() {
	gulp.src(paths.dist.root).pipe(connect.reload());
});

gulp.task('open', function() {
	return gulp.src(paths.dist.root).pipe(open({
		uri: 'http://localhost:' + settings.port
	}));
});

gulp.task('server', function(cb) {
	runSequence('watch', 'connect', 'open', cb);
});


/*
 * ================================= format =================================
 */
gulp.task('format', function() {
	gulp.src(['js/app/**/*.js', 'less/**/*.less', 'scss/**/*.scss'], {
		cwd: paths.source.root,
		base: paths.source.root
	}).pipe(prettify()).pipe(gulp.dest(paths.source.root));
});


/*
 * ================================= release =================================
 */
gulp.task('release:copy', function(cb) {
	gulp.src(['favicon.ico', 'fonts/**', 'images/**', 'pages/**', 'index.html', 'css/*.min*.css', 'js/*.min*.js'], {
		cwd: paths.dist.root,
		base: paths.dist.root
	}).pipe(gulp.dest(paths.release.root + 'web/')).on('end', cb);
});

gulp.task('release:compress', function(cb) {
	gulp.src(paths.release.root + 'web/**').pipe(zip('web.zip')).pipe(gulp.dest(paths.release.root)).on(
		'end', cb);
});

gulp.task('release', function(cb) {
	runSequence('clean:release', 'dist', 'release:copy', 'release:compress', cb);
});


/*
 * ================================= default =================================
 */
gulp.task('default', function(cb) {
	runSequence('dist-dev', 'server', cb);
});
