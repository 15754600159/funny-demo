define(function(require){
	var contentModule = require('./filecontent'),
		fileModule = require('./fileanalyze');
	var init = function(){
		contentModule.init({
			container: '.content-box'
		});
		fileModule.init();
	}
	var render = function(data){
		var etype = mining.mappingutils.getType(data);
		data.tabId = $('.page-file .filenavtabs .tabslist .tab-panel.active').attr('data-tabid');

		// 根据数据渲染档案页主体内容 or 文档分析
		if(data.tabType == '3'){
			fileModule.show(data.gid);
		}else if(!mining.utils.isEmpty(data)){
			contentModule.show(data);
		}
	}

	var resetContentBox = function(){
		$('.content-box').removeAttr('gid').removeAttr('tabid').find('.filecontent-box').addClass('hidden');
	}
	return {
		init: init,
		show: render,
		refresh: resetContentBox
	}
});