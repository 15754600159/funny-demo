define(function(require){
	/* ---------- 首页 ---------- */
	var $page = $('.page-home');
	//刷新布局
    var pageResize = function(){}
    
	/* 初始化首页 */
    var initPage = function(){
    	$page = $('.page-home');
    	$('.maincontainer .home').removeClass('hide').siblings().addClass('hide');
    	mining.utils.loadPage($page, function(){});
		seajs.log('首页');
    }
    
    return {
    	init: initPage
    }
});