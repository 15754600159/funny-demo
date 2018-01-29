define(function(require, exports, module){
	
	/**
     * @name Infoside
     * @class 右侧功能组：统计、详情、时间卷轴。
     */
    var defaultConfig = {
	    	graph: null,
	    	eventModule: null,
	    	container: null,
	    	group: true,//是否启用统计
	    	details: true,//是否启用详情
	    	timereel: true,//是否启用时间卷轴
	    	selectec: true,//选中切换统计集合
	    	scale: 'full'
	    },
	    requestUrl = {
	    	templete: staticUrl + '/scopa/template/core/infoside.html'
	    };
	
	window.scopa_infosideaction = false;
	

	module.exports = function(){
		var groupModule = new (require('./group'))(),
		    detailsModule = new (require('./details'))(),
		    timereelModule = new (require('./timereel'))(),
		    config = null,
	    	graph = null,
	    	eventModule = null,
	    	selection = null,
	    	eventarr = null,
	    	$info = null;
		
		var setParam = function(param){
	    	config = $.extend({}, defaultConfig, param);
			graph = config.graph;
			eventModule = config.eventModule;
			$info = config.container = typeof config.container == 'string' ? $(config.container) : config.container;
	    }
	    
		var initInfoside =  function(param){
			setParam(param);
			if(mining.utils.isEmpty(graph) || $info.size() < 1) return;
			if(!$info.hasClass('infoside')) $info.addClass('infoside');
			$info.data('config', config);
			loadTemplete(function(){
				if(config.group)groupModule.init(config);
				//if(config.details)detailsModule.init(config);
				//if(config.timereel)timereelModule.init(config);
				
				refreshData(config);
				
				//nav
				$info.off('click', '[tab]').on('click', '[tab]', function(){
					var _tab = $(this).attr('tab');
					$info = $(this).parents('.infoside:first');
					config = $info.data('config');
					tabChange(_tab);
					
					var logId = 49, logTab = '';
					if(_tab == 'info-group'){
						logTab = '统计';
					}else if(_tab == 'info-details'){
						logTab = '详情';
					}else if(_tab == 'info-timereel'){
						logTab = '时间卷轴';
					}
					if($('.page-map .breadnav-map').hasClass('active')){
						logId = 69;
					}
					mining.utils.serverLog(logId, logTab);//用户行为记录
				});
				
				//收放
				$('.scalebtn,.scaleimg',$info).off('click').on('click', function(){
					if($('.scalebtn-full',$info).is(':visible')){
						scaleChange($.extend(config,{scale: 'small'}));
					}else{
						scaleChange($.extend(config,{scale: 'full'}));
					}
				});
			});
		}
		
		var loadTemplete = function(callback){
			if($('.info-group', $info).size() > 0){
				callback.call();
				return;
			}
			$ajax.ajax({
				url: requestUrl.templete,
				success: function(result){
					$info.html(result);
					callback.call();
				},
				error: function(result){
					seajs.log(result);
				}
			});
		}
		
		var tabChange = function(tab){
			if(window.scopa_infosideaction_timereel && !window.scopa_infosideaction_timereel_click){
				window.scopa_infosideaction_timereel = false;
				return;
			}
			window.scopa_infosideaction_timereel_click = false;
			var $current = $('[tab=' + tab + ']', $info),
				ofset = 30,
				w = 32;
			
			if($current.size() < 1) return;
			if(!config[tab.replace('info-','')])return;
			$current.addClass('active').siblings('.active').removeClass('active');
			if(tab == 'info-timereel'){
				ofset = 15;
	    		w = 64
	    	}
	    	$('.nav-active', $info).animate({left: 350 - mining.browser.w + $current.offset().left + ofset, width: w}, {duration: 300, easing: 'easeOutQuart'});
	    	
	    	$('.' + tab, $info).show().siblings().not('.nav,.scalebox').hide();
	    	refreshCurrent(tab);
		}
		
		var refreshCurrent = function(tab){
			var $panel = $('.' + tab, $info);
			
			if($panel.attr('init') == 'true') return;
			eventarr = [];
			if(eventModule)eventarr = eventModule.getdata(':selected');
			$.extend(config, {
				container: $info,
				selection: selection,
				eventarr: eventarr
			});
			switch(tab){
				case 'info-group':groupModule.init(config);break;
				case 'info-details':detailsModule.init(config);break;
				case 'info-timereel':timereelModule.init(config);break;
			}
			$panel.attr('init', 'true');
		}
		
		//刷新数据
		var refreshData = function(param){
			setParam(param);
			var newselection = ((graph.$(':selected').length > 0 && config.selectec) ? graph.$(':selected') : graph.elements());
			//if(!mining.utils.isEmpty(selection) && ((selection.same && selection.same(newselection) || mining.utils.isEqual(selection,newselection)))) return;
			selection = newselection;
			eventarr = [];
			if(eventModule)eventarr = eventModule.getdata(':selected');
			scopa_infosideaction = false;
			$('.info-group,.info-details,.info-timereel', $info).attr('init', 'false');
			tabChange('info-group');
		}
		
		//展示数据
		var showInfo = function(param){
			setParam(param);
			var newselection = ((graph.$(':selected').length > 0 && config.selectec) ? graph.$(':selected') : graph.elements());
			selection = newselection;
			eventarr = [];
			if(eventModule)eventarr = eventModule.getdata(':selected');
			scopa_infosideaction = false;
			$('.info-group,.info-details,.info-timereel', $info).attr('init', 'false');
			
			var tab = '';
			
			$('.info-group,.info-details,.info-timereel', $info).attr('init', 'false');
			if(config['details'] && (eventarr.length == 1 || graph.nodes(':selected').length == 1 || graph.nodes('.entity:selected').length == 1 || graph.edges('.relation:selected').length == 1)){
				tab = 'info-details';
			}else{
				tab = 'info-group';
			}
			if(window.scopa_infosideaction_timereel_click){
				tab = 'info-details';
			}
			tabChange(tab);
		}
		
		/* 收放控制 */
		var isScaleing = false;
		var scaleChange =  function(config){
			if(isScaleing) return;
			isScaleing = true;
			setParam(config);
			var $grahpside = $info.siblings('.grahpside'),
				navleft = parseInt($('.graphnavigator',$grahpside).css('left'));
			
			if(config.scale == 'small' && $('.scalebox .scalebtn-small',$info).is(':hidden')){
				$info.data('scale', {width: $info.width(), height: $info.height()});
				$info.animate({width:78, height:129},300);
				$grahpside.animate({'padding-right':0},300);
				$('.ui-cytoscape-panzoom',$grahpside).animate({top:60},300);
				$('.graphnavigator',$grahpside).animate({left:navleft + 350},300);
				$('.scalebox',$info).width(78).height(129);
				$('.scalebox .scalebtn-small',$info).show();
				$('.scalebox .scalebtn-full',$info).hide();
				setTimeout(function(){
					$('.scalebox .scaleimg',$info).fadeIn(300);
				},200);
			}else if(config.scale == 'full' && $('.scalebox .scalebtn-full',$info).is(':hidden')){
				$info.animate($info.data('scale'),300);
				$grahpside.animate({'padding-right':350},300);
				$('.ui-cytoscape-panzoom',$grahpside).animate({top:-65},300);
				$('.graphnavigator',$grahpside).animate({
					left:navleft - 350
				},{
					duration: 300
				});
				$('.scalebox',$info).width(22).height(22);
				$('.scalebox .scalebtn-full',$info).show();
				$('.scalebox .scaleimg,.scalebox .scalebtn-small',$info).hide();
			}
			$('.infolistcontent',$info).css('height', 'auto');
			setTimeout(function(){
				graph.resize();
				isScaleing = false;
				//refreshData(config);
			},400);
		}
		
		return {
			init: initInfoside,
			show: showInfo,
			refresh: refreshData,
			scale: scaleChange
		}
	}
});