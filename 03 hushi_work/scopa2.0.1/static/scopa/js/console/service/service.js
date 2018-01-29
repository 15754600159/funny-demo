define(function(require){
	/* ---------- 首页 ---------- */
	var $page = $('.page-service'),
		requestUrl = {};
	
	//刷新布局
    var pageResize = function(){
    	//TODO
    }
    
	/* 初始化 */
    var initPage = function(){
    	mining.utils.loadPage($page, function(){
			mining.utils.winResize({name:pageResize}); 
    	
	    	seajs.log('服务状态');
    	});
    }
    
    
    return {
    	init: initPage
    }
});