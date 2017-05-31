var fs = require('fs');
var cheerio = require('cheerio');
var excelExport = require('excel-export');

fs.readFile('wechat.html', 'utf8', (err, data) => {
	if(err){
		console.log(err);
	}

	// console.log(data)
	var $ = cheerio.load(data);
	var personElems = $('#mmpop_chatroom_members > div > div > div.scrollbar-dynamic.members_inner.ng-scope.scroll-content.scroll-scrolly_visible > .ng-scope');
	// var name = $(personElem).attr('title');
	// console.log(name);
	var names = [];
	personElems.each(function(index, elem){
		//数据格式调整
		names[index] = [];
		names[index].push($(elem).attr('title'));
	})

	// console.log(names);

	//excel对象conf配置
	var conf = {};
	conf.name = 'mysheet';
	conf.cols = [{
		caption:'name',
        type:'string'
	}];
	//必须要是 [['aa','bb'],['cc'，'dd']]的格式
	conf.rows = names;
	var result = excelExport.execute(conf);
	fs.writeFile('./a.xlsx', result, 'binary', function(err){
		if (err){
			console.log(err);
		}

		console.log('成功导出')
	})
})