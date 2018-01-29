define(function(require){
    var $page = $('.page-analysis');
    
    //刷新布局
    var pageResize = function(){
		$('.iframe-analysis',$page).height($page.height()).width($page.width());
    }
        var nav= require('core/app/fixednav');
	var initPage = function(){
		$page = $('.page-analysis');
		$page.html('<iframe class="iframe-analysis" src="' + staticUrl + '/app/analysis/analysis.html"></iframe>');
		mining.utils.winResize({name:pageResize});
          nav.init($page,3);
    }
	
    return {
        init: initPage
    }
});
