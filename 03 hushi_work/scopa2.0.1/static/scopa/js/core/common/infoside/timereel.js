define(function(require, exports, module){
	
	/**
     * @name Timereel
     * @class 右侧时间卷轴功能。
     */
    var defaultConfig = {
	    	graph: null,
	    	eventModule: null,
	    	container: null,
	    	selection: null,
	    	eventarr: null
	    };
	
    
	module.exports = function(){
		var graph = null,
			eventModule = null,
			eventarr = null,
		    selection = null,
		    selection2 = null,
		    isAnimating = false,
			isExpanded = false,
		    timecolor = '#224a84',
		    $info, $timereel;
	    
		var initTimereel =  function(config){
		config = $.extend({}, defaultConfig, config);
		graph = config.graph;
		eventModule = config.eventModule;
		$info = config.container;
		$timereel = $('.info-timereel',$info);
		selection = config.selection || [];
		eventarr = config.eventarr || [];
		
		if(mining.utils.isEmpty(graph) || $info.size() < 1 || $timereel.size() < 1) return;
		
		$('.reelselected',$timereel).height(mining.browser.h - 600 - 70).mCustomScrollbar({
    		theme: 'minimal'
    	});
		initReel();
		initEvent();
		refreshTimereel();
	}
	
	/* 初始化时间卷轴 */
	var reeltimer, reelcount = 1, reelrotate = 0, tdwidth = 20/2, tdwidth2 = 13/2;
	var reelSroll = function(){
		reelrotate = -reelcount * 360 / 24;
		$('.timereel',$timereel).transform('rotateY('+ reelrotate +'deg)');
		reelcount++;
	}
	var reelTimer = function(action){
		clearInterval(reeltimer);
		if(action == 'stop'){
			$('.timereel',$timereel).transform('transform 0 linear', 'transition');
		}else{
			$('.timereel',$timereel).transform('transform 0.5s linear', 'transition');
			//reelcount = 1;
			reelSroll();
			reeltimer = setInterval(reelSroll,500);
		}
	}
	var initReel = function(){
		var weekdays = moment.weekdays();
		
		weekdays.push(weekdays.shift());
		
		var rows = cols = '';
		var axis = '<div class="th {axis}">{time}</div>'
		
		for(var i = 0; i < 7; i++){
			rows += '<div class="td" week="' + i + '" hour="{hour}"></div>';
		}
		rows = '<div class="row">' + rows + '</div>';
		for(var i = 0; i < 24; i++){
			_axis = axis.replace('{time}', i);
			cols += '<div class="col">' + _axis.replace('{axis}', 'thead') + rows.replaceAll('{hour}', i) + _axis.replace('{axis}', 'tfoot') + '</div>'
		}
		
		$('.timereel',$timereel).html(cols);
		
		var legend = '';
		for(var i = 1; i <= 10; i++){
			legend += '<span style="background-color:' + mining.utils.getRGB(timecolor, i / 10) + ';border-color:' + mining.utils.getRGB('#147a8d', i / 10) + '"><i>' + (i*10) + '%</i></span>';
		}
		$('.legend-color',$timereel).html(legend);
		

		var r = 360;
		var rotate = r / 24
			transZ = tdwidth / Math.tan((rotate / 2 / (r / 2) ) * Math.PI);
			
		$('.timereel .col',$timereel).each(function(j){
			$(this).transform('rotateY('+ (j * rotate ) +'deg) translateZ('+ (transZ) +'px)');
		});
		$('.timereelbox',$timereel).css('perspective', '1200px');
		/*var mleft = 0;
		for(var i = 12; i >= 0; i--){
			var $col = $('.timereel .col:eq(' + i + ')');
			mleft += $col.width();
			$col.css('margin-left', '-' + mleft + 'px');
		}*/
		
		var dragReel = false, dragRotate = 0, dragX = 0;
		require('jqueryui');
		$('.timereelbox .col',$timereel).draggable({ 
			helper: 'clone',
			opacity: 0.01,
			start: function(event, ui){
				if(isExpanded)return;
				dragReel = true;
				dragX = ui.position.left;
			},
			drag: function(event, ui) {
				if(isExpanded)return;
				var _left = ui.position.left - dragX;
				if(Math.abs(_left) > 100) return;
				dragRotate = reelrotate + (180 * _left / 100);
				$('.timereel',$timereel).transform('rotateY('+ dragRotate +'deg)');
			},
			stop: function(event, ui){
				if(isExpanded)return;
				reelrotate = dragRotate;
				dragRotate = 0;
				$('.timereel',$timereel).transform('rotateY('+ reelrotate +'deg)');
				dragReel = false;
			}
		});
		
		$('.timereelbox .mask,.reelselected',$timereel).on('mouseenter', function(){
			if(!isExpanded && !dragReel){
				$('.timereelbox .reel-close',$timereel).fadeIn();
				reelTimer();
			}
		});
		$('.timereelbox .reel-close',$timereel).on('mouseenter', function(){
			$('.timereelbox .reel-close',$timereel).fadeOut();
		});
		$('.timereelbox .col',$timereel).on('mouseenter', function(){
			reelTimer('stop');
		});
		
		var expandReel = function(){
			if(isAnimating)return;
			isAnimating = true;
			isExpanded = true;
			reelTimer('stop');
			$('.timereelbox .mask',$timereel).animate({'opacity': 0}, 150);
			$('.timereelbox .reel-close,.timereelbox .reel-top',$timereel).fadeOut('150');
			setTimeout(function(){
				$('.timereel',$timereel).transform('rotateY(0deg)');
				$('.timereelbox',$timereel).addClass('expand');
				var r = 115;
				var rotate = r / 24
					transZ = tdwidth2 / Math.tan((rotate / 2 / (r / 2) ) * Math.PI);
					
				$('.timereel .col',$timereel).each(function(j){
					$(this).transform('rotateY('+ (j * rotate - (r / 2)) +'deg) translateZ('+ (transZ + 120) +'px)');
				});
				$('.timereelbox',$timereel).css('perspective', '1400px');
				$('.legend-weekday',$timereel).animate({'left': 10}, 500);
			}, 100)
			
			setTimeout(function(){
				setTimeout(function(){
					$('.timereelbox .row',$timereel).css('background', 'none');
				}, 100);
				$('.timereelbox .mask',$timereel).css({
					'opacity': '0',
					'background-position':'11px 58px'
				}).animate({'opacity': 1}, {duration:1000, complete:function(){
					isAnimating = false;
				}});
			}, 450);
			
			if($('.page-graph .breadnav-graph').hasClass('active')){
				mining.utils.serverLog(55);//用户行为记录
			}else if($('.page-map .breadnav-map').hasClass('active')){
				mining.utils.serverLog(75);//用户行为记录
			}
		}
		
		var closeReel = function(){
			if(isAnimating)return;
			isAnimating = true;
			
			$('.timereelbox .mask',$timereel).animate({'opacity': 0}, {duration:200, complete: function(){
				$(this).css({
					'background-position':' -300px -300px'
				});
			}});
			setTimeout(function(){
				$('.timereelbox .row',$timereel).removeAttr('style');
			}, 150);
			
			
			setTimeout(function(){
				$('.timereel',$timereel).transform('rotateY(0deg)');
				var r = 360;
				var rotate = r / 24
					transZ = tdwidth / Math.tan((rotate / 2 / (r / 2) ) * Math.PI);
					
				$('.timereel .col',$timereel).each(function(j){
					$(this).transform('rotateY('+ (j * rotate ) +'deg) translateZ('+ (transZ) +'px)');
				});
				$('.timereelbox',$timereel).css('perspective', '1200px');
				$('.legend-weekday',$timereel).animate({'left': 90}, 500);
				$('.timereelbox',$timereel).removeClass('expand');
				setTimeout(function(){
					$('.timereelbox .reel-close,.timereelbox .reel-top',$timereel).fadeIn('150');
					$('.timereelbox .mask',$timereel).animate({'opacity': 1}, {duration:150, complete:function(){
						isAnimating = false;
						isExpanded = false;
					}});
				}, 400);
				reelTimer();
			}, 300);
		}
		
		
		$('.timereelbox .mask,.timereelbox .reel-top',$timereel).off('click').on('click', function(){
			if(isExpanded){
				closeReel();				
			}else{
				expandReel();
			}
		});
		$('.td',$timereel).off('click').on('click', function(){
			var weight = $(this).data('weight'), 
				idArr = weight.ids,
				ids = weight.ids.join(','),
				selectedDataArr = [],
				selectedItems;
			
			if(weight.ids.length < 1) return;
			window.scopa_infosideaction = true;
			window.scopa_infosideaction_timereel = true;
			try{
				graph.$(':selected').difference(ids).unselect();
				graph.$(ids).select();
				selectedItems = graph.$(ids);
				$('.eventlistdlg .eventlist tr').removeClass('active');
				$.each(idArr, function(i,n){
					var _id = n.replace('#', '');
					$('.eventlistdlg .eventlist tr[gid=' + _id + ']').addClass('active');
					selectedDataArr.push(eventModule.getdata(_id));
				});

					$('.eventlistdlg .eventlist tr.active')
				$('.eventlistdlg').each(function(){
					var $elist = $(this).find('.eventlist');
					$elist.mCustomScrollbar('scrollTo',$('tr.active:first',$elist));
				});
			}catch(e){
				selectedItems = [];
				$.each(graph.elements(), function(i,n){
					if(weight.ids.indexOf('#' + n.data().id) != -1){
						n.select();
						selectedItems.push(n);
					}else{
						n.unselect();
					}
				});
			}
			$.each(selectedItems, function(i,n){
				selectedDataArr.push(n.data().data);
			});
			$('.reelitems',$timereel).empty();
			$.each(selectedDataArr, function(i,n){
				var data = n,
					title = mining.mappingutils.getTitle(data);
				
				$('.reelitems',$timereel).append(['<div class="item" gid="' + data.gid + '">',
					'<div class="num">' + (i+1) + '</div>',
					'<div class="icon"><span class="itemicon" style="background-image:url(' + mining.mappingutils.getGraphIcon(data) + ')"></span></div>',
					'<div class="name ellipsis" title="' + title + '">' + title + '</div>',
				'</div>'].join(''));
			});
			window.scopa_infosideaction = false;
			if($('.page-graph .breadnav-graph').hasClass('active')){
				mining.utils.serverLog(54);//用户行为记录
			}else if($('.page-map .breadnav-map').hasClass('active')){
				mining.utils.serverLog(74);//用户行为记录
			}
		});
		$timereel.off('click','.reelitems .item').on('click', '.reelitems .item', function(e){
			try{
				var _gid = $(this).attr('gid');
				if(graph.$('#' + _gid).length > 0){
					graph.elements().unselect();
					graph.$('#' + _gid).select();
				}else if($('.eventlist tr[gid=' + _gid + ']').size() > 0){
					/*$('.eventlist tr[gid].active').removeClass('active');
					$('.eventlist tr[gid=' + _gid + ']').click(e);*/
					var _infoModule;
					if($('.list-unstyled.list-inline.modeltype li:first').hasClass('active') && window.graphInfosideModule){
						_infoModule = window.graphInfosideModule;
					}else if($('.page-graph .breadnav-graph').hasClass('active') && window.mapInfosideModule){
						_infoModule = window.mapInfosideModule;
					}
					window.scopa_infosideaction_timereel_click = true;
					if(_infoModule)_infoModule.show({
						graph: graph,
						eventModule: eventModule,
						container: $info
					});
				}
			}catch(e){}
		});


		
		
		
		
		
		
		//临时解决展开后扩事件出错bug
		if(isAnimating)return;
		isAnimating = true;
		
		$('.timereelbox .mask',$timereel).css({
			'opacity': 0,
			'background-position':' -300px -300px'
		});
		$('.timereelbox .row',$timereel).removeAttr('style');
		$('.timereel',$timereel).transform('rotateY(0deg)');
		var r = 360;
		var rotate = r / 24
			transZ = tdwidth / Math.tan((rotate / 2 / (r / 2) ) * Math.PI);
			
		$('.timereel .col',$timereel).each(function(j){
			$(this).transform('rotateY('+ (j * rotate ) +'deg) translateZ('+ (transZ) +'px)');
		});
		$('.timereelbox',$timereel).css('perspective', '1200px');
		$('.legend-weekday',$timereel).animate({'left': 90}, 500);
		$('.timereelbox',$timereel).removeClass('expand');
		$('.timereelbox .reel-close,.timereelbox .reel-top',$timereel).show();
		$('.timereelbox .mask',$timereel).animate({'opacity': 1}, {duration:1, complete:function(){
			isAnimating = false;
			isExpanded = false;
		}});
		reelTimer();
	}
	
	//初始化事件
	var initEvent = function(){
		$('.selectstate [parent]',$timereel).off('click').on('click', function(){
			$(this).addClass('checked').removeClass('uncheck');
			$(this).siblings('[parent]').addClass('uncheck').removeClass('checked');
			refreshTimereel(isExpanded ? 'stop' : '');
		});
	}
	
	//刷新数据
	var refreshTimereel = function(action){
		$('.reelitems',$timereel).empty();
		reelTimer(action);
		$('.td',$timereel).each(function(){
			$(this).css('background-color', 'rgba(144,172,206,0)').data('weight', {ids:[], title:{}, value:0});
		});
		var total, eles, mainDataArr = [], selectstate = $('.selectstate [parent=true]',$timereel).hasClass('checked');
		
		try{
			if(selectstate){
				eles = graph.filter('node.entity,edge.relation,node.event');
			}else{
				eles = selection.filter('node.entity,edge.relation,node.event');
			}
		}catch(e){
			eles = selection;
		}
		$.each(eles, function(i,n){
			mainDataArr.push(n.data().data);
		})
		mainDataArr = eventModule.getdata().concat(mainDataArr);
		total = mainDataArr.length;
		$.each(mainDataArr, function(i,n){
			var data = n,
				etype = data.etype,
				type_name = mining.mappingutils.getTypeName(data),
				timeList = mining.mappingutils.getTimeList(data);
			
			if(mining.utils.isEmpty(timeList)) return;
			
			$.each(timeList, function(j,m){
				if(m.name)type_name = m.name;
				$.each(m.time, function(k,o){
					var time = moment(parseInt(o)),
						week = parseInt(time.format('e')),
						hour = parseInt(time.format('HH')),
						$item = $('[week=' + week + '][hour=' + hour + ']',$timereel),
						weight = $item.data('weight'),
						titleArr = [];
					
					weight.ids.pushOnly('#' + data.gid);
					weight.value++;
					if(!weight.title[type_name]){
						weight.title[type_name] = 1;
					}else{
						weight.title[type_name]++;
					}
					$.each(weight.title, function(j,o){
						titleArr.push(j + '：' + o);
					});
					//$item.css('background-color', mining.utils.getRGB(timecolor, weight.value * 10 / graph.edges().length)).data('weight', weight);
					//$item.css('background-color', mining.utils.getRGB(timecolor, weight.value * 10 / total)).data('weight', weight).attr('title', (weight.value * 100 / total).toFixed(2) + '%');
					$item.css('background-color', mining.utils.getRGB(timecolor, weight.value * 10 / total)).data('weight', weight).attr('title', titleArr.join('\n'));
				});
			});
		});
	}
	
	
	return {
		init: initTimereel
	}
	}
	
});