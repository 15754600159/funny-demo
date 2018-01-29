define(function(require){
	/* ---------- 研判-话单 ---------- */
	var $page = $('.page-ticket');
	//刷新布局
    var pageResize = function(){}
    
	/* 初始化首页 */
    var initPage = function(){
    	$page = $('.page-ticket')
    	$('.maincontainer .judged').removeClass('hide').siblings().addClass('hide');
		seajs.log('研判-话单');
    }
    
    return {
    	init: initPage
    }
});