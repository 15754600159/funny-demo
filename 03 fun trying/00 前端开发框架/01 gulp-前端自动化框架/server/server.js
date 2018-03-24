var express = require("express");
var app = express();

//静态文件
app.use("/file", express.static(__dirname + "/file"));

// JSON数据
app.use('/', function(req, res, next) {
	var options = {
		root: __dirname + '/data/'
	};
	// console.log(req.originalUrl);
	var url = req.baseUrl + (req.path || '');
	var fileName = url.substring(1).replace(/\//g, '.') + '.json';
	// console.log('File:', fileName);
	res.sendFile(fileName, options);
});


app.listen(8000);
