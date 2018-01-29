define(function(require){
	/*---------- 自定义应用 ----------*/
	var $page;
	
	require('./style.css');//加载页面样式
		
	/* 刷新布局 */
    var pageResize = function(){
    	//TODO
    }
    
	/* 初始化图析 */
	var initPage = function(){
		$page = $('.page-myapp');
		mining.utils.loadPage($page, function(){
			mining.utils.winResize({name:pageResize}, true);
			//TODO
			console.log('自定义应用');
		});
    }
    
    
    return {
    	init: initPage
    }
});
