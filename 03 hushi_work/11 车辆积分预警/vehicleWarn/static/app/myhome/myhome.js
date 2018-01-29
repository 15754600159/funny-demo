define(function(require){
	/*---------- 自定义首页 ----------*/
	var $page;
		
	/* 刷新布局 */
    var pageResize = function(){
    	//TODO
    }
    
	/* 初始化图析 */
	var initPage = function(){
		$page = $('.page-myhome');
		mining.utils.loadPage($page, function(){
			mining.utils.winResize({name:pageResize}, true);
			//TODO
			console.log('自定义首页');
		});
    }
    
    
    return {
    	init: initPage
    }
});
