define(function(require) {
	$(function(){
		var mainModule = {
				basestyle: require('./basestyle/basestyle')
			},
			headerHtml = ['<nav class="navbar navbar-inverse navbar-fixed-top box-shadow" style="background-color:#1a427d;">',
							'<div class="container-fluid">',
								'<div class="navbar-header">',
									'<a class="navbar-brand logo" href="javascript:;">BASEUI</a>',
								'</div>',
								'<div id="navbar" class="navbar-collapse collapse">',
									'<ul class="nav navbar-nav">',
										'<li class="nav-style active"><a href="#!base/style"><span class="text">全局样式</span></a></li>',
										'<li class="nav-norm active hidden"><a href="#!base/norm"><span class="text">规范</span></a></li>',
										'<li class="nav-plugins active hidden"><a href="#!base/plugins"><span class="text">js插件</span></a></li>',
									'</ul>',
								'</div>',
							'</div>',
						'</nav>'];
		$('.main-box').before(headerHtml.join(''));
		var pathNameArr = location.pathname.split('/'),
			len = pathNameArr.length,
			fileName = pathNameArr[len-1].replace('.html',''),
			moduleName = 'base' + fileName;
		$('nav ul li.nav-' + fileName).addClass('active').siblings().removeClass('active');
		$('.main-box .module-box').mCustomScrollbar({
			theme: 'minimal'
		});
		mainModule[moduleName].init();
		//路由控制
        // var $router = require('router');
        // var pageChage = function(nav){
        // 	if(mining.utils.isEmpty(nav))nav = 'style';
        // 	$('.nav-' + nav).addClass('active').siblings('.active').removeClass('active');
        // 	$('.page-' + nav).removeClass('hidden').siblings('.basepage').addClass('hidden');
        // 	var moduleName = 'base' + nav;
        // 	loadPage($('.page-' + nav),function(){
        // 		mainModule[nav].init();
        // 	});
        // }
        
        // var loadPage = function($page, callback){
        	// if($page.hasClass('pageloaded') && callback){
       	// 		callback.call();
       	// 		return;
       	// 	}
        	//
        	// var nav = $page.attr('template');
        	// if(mining.utils.isEmpty($page)){
        	// 	nav = 'basestyle'
        	// }
        	// if(mining.utils.isEmpty(nav))return;
        	// var pageurl = staticUrl + '/scopa/bak/baseui/template/' + nav + '.html';
       	//
   		// 	$ajax.ajax({
			// 	url: pageurl,
			// 	async: false,
			// 	success: function(data){
			// 		page = data;
			//
			// 	}
			// });
			// $page.html(page);
			// $page.addClass('pageloaded');
			// if(callback)callback.call();
        // }
        // $router({
	    // 	scopa: pageChage,
	    // 	empty: pageChage
	    // });
	});
});