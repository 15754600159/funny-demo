define(function(require) {
	$(function() {
		//顶部搜索
		require('core/common/search');
    	require('core/import/import');
    	window.SCOPA_showModule = require('core/common/showelement');
		
		//获取用户信息
		mining.utils.getUserInfo();
	
		var mainModule = {
			home: require('./home/home'),						//首页
			search: require('./search/search'),					//检索
			graph: require('./graph/graph'),					//研判-图析
			map: require('./map/map'),							//研判-地图
			ticket: require('./ticket/ticket'),					//研判-话单
			file: require('./file/file'),						//档案
			//cooperate: require('./cooperate/cooperate'),		//协作
			cooperation: require('./cooperation/cooperation'),	//协作
			app: require('./app/app'),							//应用
		    forewarn: require('./control/forewarn'),			//应用-团伙预警
		    control: require('./control/control'),				//应用-多元布控 
			event:require('./event/event'),						//应用-重大事件预警
			point:require('./point/point'),						//应用-重点人积分预警
		    dynamic:require('./dynamic/dynamic'),     //应用-高位地域/群体动态管控
		    covert:require('./covert/covert'),					//应用-隐性重点人挖掘
		    analysis: require('./app/analysis'),				//应用-治安态势分析
		    cba: require('./app/cba'),							//应用-案件智能串并
		    newsearch: require('./newsearch/newsearch')
		}
		var heatmapInit = false;

        //刷新布局
        var pageResize = function(){
        	$('.main,.subpage,.maincontainer').height(mining.browser.h - 60);
        	$('.subpage.page-ticket').height('35');
        }
        
        mining.utils.winResize({name:pageResize});
    
        //路由控制
        var $router = require('router');
        var pageChage = function(nav){
        	if(mining.utils.isEmpty(nav))nav = 'home';
			var $nav = $('.nav-' + nav);
			if(nav == 'graph' || nav == 'map' || nav == 'ticket'){
				$nav = $('.nav-graph');
			}else if($nav.size() < 1){
				$nav = $('.nav-app');
			}
			$nav.addClass('active').siblings('.active').removeClass('active');
        	$('.page-' + nav).addClass('active').siblings('.subpage').removeClass('active');
        	if(nav == 'home' || nav == 'ticket' || nav == 'cooperation'){
        		$('.subpage.active').removeClass('active');
        		$('.maincontainer').css('visibility', 'visible');
        		if(nav == 'ticket')$('.page-ticket').addClass('active');
        	}else{
        		$('.maincontainer').css('visibility', 'hidden');
        	}
        	try{
        		if(BMap && ((nav == 'control' && window.SCOPA_MAP_GRAPH) || (nav =='map' && window.SCOPA_MAP_APP))){
        			window.SCOPA_MAP_APP = window.SCOPA_MAP_GRAPH = false;
        			mining.utils.reload();
        		}
        		mining.utils.closeDlg();
        	}catch(e){}
        	mainModule[nav].init();
        	if(nav == 'graph' || nav == 'file'){
        		mining.utils.chartResize();
        	}else{
        		mining.utils.chartResize('close');
        	}
        	if(nav == 'home' && !heatmapInit){
        		var timer, timemax = 0;
				timer = setInterval(function(){
					if((window.scopaConfig.pages && $('#container .BMap_mask').size() > 0) || timemax > 100000){
						clearInterval(timer);
						setTimeout(function(){
							if(window.scopaConfig.pages)window.scopaConfig.pages.home.drawHotMap();
							heatmapInit = true;
						}, 1000)
					}
					timemax += 100;
				},100);
        	}
        }
        $router({
	    	scopa: pageChage,
	    	empty: pageChage
	    });

      	$('#navbar .nav-forewarn').off('mouseenter').on('mouseenter',function(){
          	$(this).find('.control-type').removeClass('hidden');
      	}).off('mouseleave').on('mouseleave',function(){
          	$(this).find('.control-type').addClass('hidden');
      	}).siblings('li').off('click.clearControl').on('click.clearControl',function(){
          	$('#navbar .nav-forewarn .control-type li').removeClass('active');
      	});
      	
      	//用户行为记录
      	$('.navbar-nav:first li').off('click.log').on('click.log', function(){
      		if($(this).hasClass('nav-home')){
      			mining.utils.serverLog(4, '首页');
      		}else if($(this).hasClass('nav-app')){
      			mining.utils.serverLog(4, '应用');
      		}else if($(this).hasClass('nav-search')){
      			mining.utils.serverLog(4, '检索');
      		}else if($(this).hasClass('nav-graph')){
      			mining.utils.serverLog(4, '研判');
      		}else if($(this).hasClass('nav-file')){
      			mining.utils.serverLog(4, '档案');
      		}else if($(this).hasClass('nav-cooperation')){
      			mining.utils.serverLog(4, '协作');
      		}
      	});
      	$(document).off('click.log','.breadnav li a').on('click.log','.breadnav li a', function(){
      		if($(this).attr('href') == '#!scopa/graph'){
      			mining.utils.serverLog(8, '研判-图析模式');
      		}else if($(this).attr('href') == '#!scopa/map'){
      			mining.utils.serverLog(8, '研判-地图模式');
      		}else if($(this).attr('href') == '#!scopa/ticket'){
      			mining.utils.serverLog(8, '研判-话单模式');
      		}
      	});
      	
      	// 权限
      	if(mining.utils.hasRoleForAction('import')){
          	$('.import').removeClass('hidden');
      	}
      
      	/*3.0加载*/
     	var scopaConfigTimer = setInterval(function(){
     		if(window.scopaConfig){
				scopaConfig.pages.home.init();
				scopaConfig.pages.judged.init();
				scopaConfig.pages.cooperation.init();
				clearInterval(scopaConfigTimer);
     		}
     	}, 100);
	});
});