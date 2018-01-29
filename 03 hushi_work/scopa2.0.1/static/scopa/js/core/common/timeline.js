define(function(require, exports, module){
	
    /**
     * @name timeLine
     * @class 底部时间线控件。
     */
    	
	require('timeline');
	require('moment');
	require('ztree');
	
	module.exports = function(){
		
		var defaultConfig = {
		    	graph: null,
		    	eventModule: null,
		    	container: null,
		    	timefilter: null,
		    	legendfilter: null,
		    	scale: 'full'
		    },
	   		$timeline,
	   		graph,
	   		eventModule,
	   		legendTree,
	   		timefilter,
	   		legendfilter;
	   	
	   	window.scopa_timelineaction = false;
		
	    var setParam = function(config){
	    	config = $.extend({}, defaultConfig, config);
			graph = config.graph;
			eventModule = config.eventModule;
			$timeline = config.container = typeof config.container == 'string' ? $(config.container) : config.container;
	    	timefilter = config.timefilter;
	    	legendfilter = config.legendfilter;
	    }
	   	
	    var initTimeline = function(config){
	    	setParam(config);
			if(mining.utils.isEmpty(graph) || $timeline.size() < 1) return;
	    	
	    	refreshUIData(config);
	    }
	    
	    var refreshUIData = function(config){
	    	setParam(config);
	    	refreshTree();
	    	refreshTimeline();
				
			//收放
			$('.scalebtn,.scaleimg',$timeline).off('click').on('click', function(){
				if($('.scalebtn-full',$timeline).is(':visible')){
					scaleChange($.extend(config,{scale: 'small'}));
				}else{
					scaleChange($.extend(config,{scale: 'full'}));
				}
			});
	    }
	    
	    /* 颜色控制 */
	    var localColor = mining.utils.localStorage(mining.localname.timelineColor) || {};
	    var colorArr = ['#17becf', '#1f77b4', '#98df8a', '#ffbb78', '#c5b0d5', '#f7b6d2', '#7f7f7f', '#dbdb8d', '#9edae5', '#c49c94', '#aec7e8', '#e377c2', '#bcbd22', '#ff9896', '#c7c7c7', '#9467bd', '#8c564b', '#d62728', '#ff7f0e', '#2ca02c'];
	    $.each(colorArr, function(i,n){
	    	colorArr[i] = mining.utils.getRGB(n, 1);//0.8)
	    });
	    var eventColor = function(index, name){
	    	if(!mining.utils.isEmpty(name) && localColor && localColor[name])return localColor[name];
	    	
	    	while(index > colorArr.length - 1){
	    		index -= colorArr.length;
	    	}
	    	if(index < 0)index = 0;
	    	
	    	return colorArr[index]
	    }
	    
	    /* 刷新树 */
	    var refreshTree = function(){
	    	var setting = {
	    		view: {
	    			nameIsHTML: true,
	    			showIcon: false,
	    			showTitle: false,
	    			selectedMulti: false
	    		},
	    		check: {
	    			enable: true
	    		},
	    		callback: {
					onCheck: function(e){
						refreshTimeline();
						var uncheckLabel = [];
						$.each(legendTree.getCheckedNodes(false), function(i,n){
							if(n.label)uncheckLabel.push(n.label);
						});
						if(legendfilter)legendfilter(uncheckLabel);
						if($('.page-graph .breadnav-graph').hasClass('active')){
							mining.utils.serverLog(46);//用户行为记录
						}else if($('.page-map .breadnav-map').hasClass('active')){
							mining.utils.serverLog(66);//用户行为记录
						}
					}
				}
	    	};
	    	
	    	
			var groupByType = {
					relation: {
						name: '关系类别',
						types: [],
						children: []
					},
					event: {
						name: '事件类别',
						types: [],
						children: []
					},
					entity: {
						name: '实体类别',
						types: [],
						children: []
					}
				}, 
				colorIndex = 0,
				mainDataArr = [],
				treeInitData = [];
			
			$.each(graph.$('node.entity,edge.relation,node.event'), function(i,n){
				mainDataArr.push(n.data().data);
			});
			mainDataArr = eventModule.getdata().concat(mainDataArr);
			$.each(mainDataArr, function(i,n){
				var data = n,
					etype = data.etype,
					timeList = mining.mappingutils.getTimeList(data),
					color = '';
				
				if(mining.utils.isEmpty(timeList)) return;
				$.each(timeList, function(j,o){
					if(groupByType[etype].types.indexOf(o.label) != -1)return;
					color = eventColor(colorIndex, o.label);
					localColor[o.label] = color;
					groupByType[etype].children.push({
		    			name:'<span class="legenditem"><span class="legendtext">' + o.name + '</span><input type="text" class="legendcolor" value="' + color + '" label="' + o.label + '" style="background:' + color + '"></span>',
		    			checked: true,
		    			label: o.label,
		    			color: color
					});
		    		groupByType[etype].types.push(o.label);
		    		colorIndex++;
				});
			});
			mining.utils.localStorage(mining.localname.timelineColor, localColor);//本地化配色
			$.each(groupByType, function(i,n){
				if(n.children.length < 1) return;
				treeInitData.push({
					name: n.name, 
					labe: i,
					open: true,
					checked: true,
					children: n.children
				});
			});
	
			legendTree = $.fn.zTree.init($('.legendtree',$timeline), setting, treeInitData);
			window.legendTree = legendTree;
	    	
			//填充颜色
			require.async('colorpicker', function(){
				$('input.legendcolor',$timeline).colorPicker({
				    appendTo: document.body,
				    margin: {left: 30, top: -160},
				    customBG: '#222',
				    readOnly: true,
				    init: function(elm, colors) {
				      	elm.style.backgroundColor = elm.value;
				      	elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
				    },
				    actionCallback: function(e){
				    	$('.legendcolor', $timeline).each(function(index){
				    		localColor[$(this).attr('label')] = $(this).val();
				    	});
				    	mining.utils.localStorage(mining.localname.timelineColor, localColor);//本地化配色
				    	refreshTimeline();
				    }
				});
			});
			//清除自定义填色
			if($('.legendcolor-clear',$timeline).size() < 1){
				$('.legendbox',$timeline).append('<a class="legendcolor-clear" href="javascript:;" title="清除自定义颜色"></a>');
				$('.legendcolor-clear',$timeline).off('click').on('click', function(){
					$('input.legendcolor',$timeline).each(function(){
						
					});
					localColor = {};
					mining.utils.localStorage(mining.localname.timelineColor, localColor);
					refreshTree();
	    			refreshTimeline();
				});
			}
		
	    	$('.legendbox',$timeline).mCustomScrollbar({
	    		scrollButtons: {
	    			enable: true
	    		},
	    		theme:"dark-thin"            
	    	});
	    }
	    
	    /* 刷新堆栈图 */
	    var refreshTimeline = function(){
	    	var timeData = {};
	    	var dataArr = [];
	    	var timeArr = [];
	    	var checkedLabel = [];
	    	var uncheckLabel = [];
	    	var mainDataArr = [];
			
			$.each(legendTree.getCheckedNodes(true), function(i,n){
				if(n.label)checkedLabel.push(n.label);
			});
			$.each(legendTree.getCheckedNodes(false), function(i,n){
				if(n.label)uncheckLabel.push(n.label);
			});
			$.each(graph.$('node.entity,edge.relation,node.event'), function(i,n){
				mainDataArr.push(n.data().data);
			});
			mainDataArr = eventModule.getdata().concat(mainDataArr);
			$.each(mainDataArr, function(i,n){//瓶颈 pushOnly问题
				var data = n,
					etype = data.etype,
					timeList = mining.mappingutils.getTimeList(data);
				
				$.each(timeList, function(j,o){
					if(checkedLabel.indexOf(o.label) == -1 || mining.utils.isEmpty(o.time)) return;
		    		if(mining.utils.isEmpty(timeData[o.label])){
		    			timeData[o.label] = [];
		    		}
		    		timeData[o.label].push(data);
				});
	    	});
	    	$.each(timeData, function(name, values){
	    		var event = {
	    			name: name,
	    			data: []
	    		}
	    		
	    		$.each(values, function(i,n){
	    			var timeList = mining.mappingutils.getTimeList(n);
	    			$.each(timeList, function(j,m){
						$.each(m.time, function(k,o){
		    				var _time = parseInt(o), _has = -1;
			    			$.each(event.data, function(j,m){
			    				if(m.time == _time){
			    					_has = j;
			    					return false;
			    				}
			    			});
			    			if(_has != -1){
			    				event.data[_has].count++;
			    			}else{
				    			event.data.push({time:_time, count:1});
			    				//timeArr.pushOnly(_time);
			    				if(timeArr.lastIndexOf(_time) == -1)timeArr.push(_time);
			    			}
		    			});
	    			});
	    		});
	    		dataArr.push(event);
	    	});
	    	//数据对等处理
	        var dataset = mining.utils.clone(dataArr);
	    	$.each(dataset, function(i, item){
	    		var arr = [];
				$.each(timeArr, function(n, time){
					var has = false;
	    			$.each(item.data, function(j, datum){
	    				if(datum.time == time){
	    					 has = true;
	    					 return false;
	    				}
	    			});
	    			if(!has){
	    				arr.push({
	    					count: 0,
	    					time: time
	    				});
	    			}
	    		});
	    		dataArr[i].data = dataArr[i].data.concat(arr);
	    	});
	        //日期处理
	        var endTime = null;
	        var startTime = null;
	        var month = 30 * 24 * 60 * 60 * 1000;
	        $.each(dataArr, function(i, item){
	        	item.data.sort(function(a,b){return a.time>b.time?1:-1});
	        	endTime = item.data[item.data.length -1].time + 1 * month;
	        	startTime = item.data[0].time - 1 * month;
	        	
				$.each(item.data, function(j, datum){
					datum.time = new Date(datum.time);
				});
	    	});
		    var chartId;
		    do{
		    	chartId = 'timeLineChart' + mining.utils.randomInt(0,100);
		    }while($('#' + chartId).size() > 0)
			$('.chartbox',$timeline).html('<div class="timeLineChart" id="' + chartId + '"></div>');
	    	// create chart function
	    	var timelineChart = d3.chart.timeline()
	    	  	.height(180)
	    	  	.width($('.timeLineChart',$timeline).width())
	    	  	.start(new Date(startTime))
	    	  	.end(new Date(endTime))
	    	  	.eventColor(eventColor)
			  	.eventHover(function(el) {
					/*var series = el.parentNode.firstChild.innerHTML;
	        		var timestamp = d3.select(el).data()[0];
	        		seajs.log('Hovering [' + timestamp + '] in series "' + series + '"');*/
	          	})
	          	.eventZoom(function (scale) {
	        		/*var limit = scale.domain();
	        		var period = parseInt((limit[1] - limit[0]) / (60 * 60 * 1000) );
	        		seajs.log('Zoomed on a period of "' + period + ' hours"');*/
	          	})
	          	.brushStart(function(){
	          		scopa_timelineaction = true;
	          		if($('.page-graph .breadnav-graph').hasClass('active')){
						mining.utils.serverLog(47);//用户行为记录
					}else if($('.page-map .breadnav-map').hasClass('active')){
						mining.utils.serverLog(67);//用户行为记录
					}
	          	})
	          	.brushMove(function(brush){
					if(timefilter)timefilter(brush.extent(), checkedLabel,uncheckLabel);
	          	})
	          	.brushClose(closeFilter);
	    	  
	    	// bind data with DOM
	    	var element = d3.select('#' + chartId).datum(dataArr);
	    	
	    	// draw the chart
	    	timelineChart(element);
	    	closeFilter();
	    }
	    
	    var closeFilter = function(){
	    	try{
	  			graph.$('.nofilter').removeClass('nofilter');
	  		}catch(e){
	  			$.each(graph.$('.nofilter'), function(i,n){
	  				n.removeClass('nofilter');
	  			});
	  		}
	  		scopa_timelineaction = false;
	  		eventModule.closefilter();
	    }
		
		/* 收放控制 */
		var isScaleing = false;
		var scaleChange = function(config){
			if(isScaleing)return;
			isScaleing = true;
	    	setParam(config);
			var $graph = $timeline.siblings('.graph'),
				navtop = parseInt($('.graphnavigator',$graph).css('top'));
			
			if(config.scale == 'small' && $('.scalebox .scalebtn-small',$timeline).is(':hidden')){
				$timeline.animate({width:80, height:102, top:-102},300).addClass('scale-small');
				$graph.add($('#graphChart,#mapGraph',$graph)).animate({height:$graph.height() + 180},300);
				$('.graphnavigator',$graph).animate({top:navtop + 180},300);
				$('.scalebox',$timeline).width(80).height(102);
				$('.scalebox .scalebtn-small',$timeline).show();
				$('.scalebox .scalebtn-full',$timeline).hide();
				setTimeout(function(){
					$('.scalebox .scaleimg',$timeline).fadeIn(300);
				},200);
			}else if(config.scale == 'full' && $('.scalebox .scalebtn-full',$timeline).is(':hidden')){
				$timeline.animate({width: '100%', height: 180, top:0},300).removeClass('scale-small');
				$graph.add($('#graphChart,#mapGraph',$graph)).animate({height:$graph.height() - 180},300);
				$('.graphnavigator',$graph).animate({
					top:navtop - 180
				},{
					duration:300
				});
				$('.scalebox',$timeline).width(22).height(22);
				$('.scalebox .scalebtn-full',$timeline).show();
				$('.scalebox .scaleimg,.scalebox .scalebtn-small',$timeline).hide();
			}
			setTimeout(function(){
				graph.resize();
				isScaleing = false;
			},400);
		}
		
		
	    return {
			init: initTimeline,
			refresh: refreshUIData,
			scale: scaleChange
		}
    }
});
