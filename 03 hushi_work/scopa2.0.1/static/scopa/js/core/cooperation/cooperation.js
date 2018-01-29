define(function(require){
	/* ---------- 首页 ---------- */
	var $page = $('.page-cooperation');
	//刷新布局
    var pageResize = function(){}
    
	/* 初始化首页 */
    var initPage = function(){
    	$page = $('.page-cooperation');
    	$('.maincontainer .cooperation').removeClass('hide').siblings().addClass('hide');
    	mining.utils.loadPage($page, function(){});
		seajs.log('协作');
    }
    
    return {
    	init: initPage
    }
});