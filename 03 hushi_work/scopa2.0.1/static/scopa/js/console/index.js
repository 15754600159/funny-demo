define(function(require) {
	$(function() {
		//获取用户信息
		mining.utils.getUserInfo();

		var mainModule = {
			home: require('./home/home'),
			data: require('./data/data'),
			analysis: require('./analysis/analysis'),
			user: require('./user/user'),
			role: require('./role/role'),
			service: require('./service/service'),
			// method: require('./method/method'),
			audit: require('./audit/audit'),
			harts: require('./harts/harts'),
			actionlog:require('./action/actionlog')
		}
        
        //刷新布局
        var pageResize = function(){
        	$('.main,.subpage').height(mining.browser.h - $('.navbar').height() + 2 - 5);
        }
        
        mining.utils.winResize({name:pageResize}); 
        
        //路由控制
        var $router = require('router');
        var pageChage = function(nav){
        	if(mining.utils.isEmpty(nav))nav = 'home';
        	$('.nav-' + nav).addClass('active').siblings('.active').removeClass('active');
        	$('.nav-active').animate({left: $('.nav-' + nav + ' a').offset().left - 45}, {duration: 300, easing: 'easeInQuart'});
        	$('.subpage').removeClass('active'); // adapted for HARTS, remove all active sub-pages
        	$('.page-' + nav).addClass('active'); // adapted for HARTS
        	mining.utils.closeDlg()
        	mainModule[nav].init();
        }
        
        $router({
	    	scopa: pageChage,
	    	empty: pageChage
	    });
	    
	});
});