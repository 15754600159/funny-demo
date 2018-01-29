define(function(require){
    var $page = $('.page-cba');
    
    //刷新布局
    var pageResize = function(){
		$('.iframe-cba',$page).height($page.height()).width($page.width());
    }
    var nav= require('core/app/fixednav');
	var initPage = function(){
		$page = $('.page-cba')
		$page.html('<iframe class="iframe-cba" src="' + staticUrl + '/app/cba/index.html"></iframe>');
		mining.utils.winResize({name:pageResize});
        nav.init($page,3);
    }
	
    return {
        init: initPage
    }
});
