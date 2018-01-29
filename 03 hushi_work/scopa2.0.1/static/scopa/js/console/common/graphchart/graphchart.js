define(function(require, exports, module){
	
	/**
     * @name graphChart
     * @class 提供图分析相关功能[init/refresh/snapshot/appenddata/layout/delelements/timefilter]。
     * @requires cytoscape, cytoscape-navigator, cytoscape-panzoom
     */
    
    var cytoscape = require('cytoscape');
	var navigator = require('cytoscape-navigator');
	var panzoom = require('cytoscape-panzoom');
	
	require('cytoscape-navigatorcss')
	require('cytoscape-panzoomcss')
	
	navigator(cytoscape, $);
	panzoom(cytoscape, $);
	
	module.exports = function(){
		var graphConfig = {
			container: $('#graphChart'),
			layout: 'circle',
			zoom: 1,
			minZoom: 0.1,
			maxZoom: 6,
			animate: 300,
			snapshot: false, //是否检测快照
			navigator: true, //是否支持导航
			panzoom: true,	//是否支持缩放
			readyCallback: null,
			selectCallback: null,
			resizeCallback: null,
			dblclickCallback: null,
			dataCallback: null
		}
		
		var graphLayout = require('./config/layout');
		var graphStyle = require('./config/style');
		var graph = null;
		
		
		/* 初始化图析 */
		var initGraph = function(config){
			var op = $.extend(graphConfig, config),
				$container = (typeof op.container == 'string' ? $(op.container) : op.container);
			
			if($container.size()<1) return ;
			if(!mining.utils.isEmpty(graph)) return graph;
			
			if(graphConfig.snapshot){
				var _style = mining.utils.clone(graphStyle);
				
				graphStyle = [];
				$.each(_style, function(i,n){
					if(n.selector == 'edge'){
						n.css['text-background-color'] = '#f6f7f9';
					}
					if(n.selector == 'node'){
						n.css['background-clip'] = 'none';
					}
					graphStyle.push(n);
				});
			}
		
			//初始化图析
			graph = cytoscape({
				container: $container[0],
				elements: op.elements,
				style: op.edgehandles ? op.style : graphStyle,
				layout: $.extend({}, graphLayout[op.layout], { animate:false}),
				ready: function(evt){
					graph = this;
					if(graph.elements().length > 0){
						graph.animate({
							zoom: op.zoom,
							pan: {x:0, y:0}
						},{
							duration: op.animate
						});
					}else{
						graph.zoom(1);
					}
					if(op.readyCallback)op.readyCallback.call();
					if(op.snapshot)initSnapshot(true);
				},
				
				// initial viewport state:
				zoom: op.minZoom,
				pan: {x:$container.width() / 2, y:$container.height() / 2},
				
				// interaction options:
				minZoom: op.minZoom,
				maxZoom: op.maxZoom,
			  	zoomingEnabled: true,
			  	userZoomingEnabled: true,
			  	panningEnabled: true,
			  	userPanningEnabled: true,
			  	boxSelectionEnabled: false,
			  	//selectionType: (isTouchDevice ? 'additive' : 'single'),
			  	touchTapThreshold: 8,
			  	desktopTapThreshold: 4,
			  	autolock: false,
			  	autoungrabify: false,
			  	autounselectify: false,
			  	
			  	// rendering options:
			  	headless: false,
	  			styleEnabled: true,
	  			hideEdgesOnViewport: false,
	  			hideLabelsOnViewport: false,
	  			textureOnViewport: false,
	  			motionBlur: false,
				motionBlurOpacity: 0.2,
	  			wheelSensitivity: 0.2,
	  			pixelRatio: 1,
				initrender: function(evt){ /* ... */ },
	  			renderer: { /* ... */ }
			});
	
			if(op.navigator){
				//初始化导航器
				$container.after('<div class="graphnavigator box-shadow" style="top:' + ($container.height() - 160) + 'px;left:' + ($container.width() - 220) + 'px;"><div class="cytoscape-navigator"></div><div class="cytoscape-navigatorTitle">导航器</div></div>');
				graph.navigator({
					container: $('.cytoscape-navigator') // can be a HTML or jQuery element or jQuery selector
  					, viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
  					, thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
  					, thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
  					, dblClickDelay: 200 // milliseconds
  					, removeCustomContainer: true // destroy the container specified by user on plugin destroy
  					, rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
				});
				require('jqueryui');
				$( ".graphnavigator" ).draggable({ 
					handle: '.cytoscape-navigatorTitle',
					opacity: 0.6,
					containment: 'parent'
				});
			}
			
			if(op.panzoom){
				//初始化缩放控制
				graph.panzoom({
					zoomFactor: 0.05, // zoom factor per zoom tick
					zoomDelay: 45, // how many ms between zoom ticks
					minZoom: op.minZoom, // min zoom level
					maxZoom: op.maxZoom, // max zoom level
					fitPadding: 50, // padding when fitting
					panSpeed: 1, // how many ms in between pan ticks
					panDistance: 10, // max pan distance per tick
					panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
					panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
					panInactiveArea: 8, // radius of inactive area in pan drag box
					panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
					autodisableForMobile: true,
					// icon class names
					sliderHandleIcon: 'ui-cytoscape-panzoom-minus',
					zoomInIcon: 'ui-cytoscape-panzoom-plus',
					zoomOutIcon: 'ui-cytoscape-panzoom-minus',
					resetIcon: 'ui-cytoscape-panzoom-full'
				});
			}
			
			//监听缩放变换展示
			graph.on('zoom', zoomUpdate);
			graph.on('mousedown', function(){
				$('#graphChart').addClass('mousedown');
			});
			graph.on('mouseup', function(){
				$('#graphChart').removeClass('mousedown');
				setTimeout(function(){
					if(graph.boxSelectionEnabled() && scopa_timelineaction){
							graph.$('.nofilter:selected').unselect();
					}
				},200);
			});
			graph.on('resize', function(){
				if(graphConfig.resizeCallback)graphConfig.resizeCallback.call();
			});
			var clicktimer, isdblclick = false;
			graph.on('click', function(){
				clearTimeout(clicktimer);
				if(isdblclick && graphConfig.dblclickCallback){
					graphConfig.dblclickCallback.call();
					isdblclick = false;
					return;
				}
				isdblclick = true;
				clicktimer = setTimeout(function(){
					isdblclick = false;
				}, 300);
			});
			
			return graph;
		}
		
		/* 缩放变化回调 */
		var zoomtimer;
		var getZoomLevel = function(){
			var zoom = graph.zoom();
			
			if(zoom > 1.6){
				return 'big';
			}else if(zoom >= 0.6){
				
				return graphConfig.snapshot ? 'normal' : 'big';
			}else if(zoom >= 0.3){
				return graphConfig.snapshot ? 'small' : 'normal';
			}else{
				return 'smaller';
			}
		}
		var zoomUpdate = function(enforce){
			clearTimeout(zoomtimer);
			zoomtimer = setTimeout(function(){
				var zoom = graph.zoom();
			
				if(zoom > 1.6){
					$.each(graph.nodes(), function(i,n){
						n.removeClass('shownormal showsmall');
						if(n.hasClass('showbigger') && !enforce)return;
						n.addClass('showbigger');
						n.style({
							'background-image': mining.mappingutils.getGraphIcon(n.data().data, 'big')
						});
					});
					graph.elements().removeClass('hidtxt hidicon');
				}else if(zoom >= 0.6){
					$.each(graph.nodes(), function(i,n){
						n.removeClass('showbigger showsmall');
						if(n.hasClass('shownormal') && !enforce)return;
						n.addClass('shownormal');
						n.style({
							'background-image': mining.mappingutils.getGraphIcon(n.data().data, graphConfig.snapshot ? 'normal' : 'big')
						});
					});
					graph.elements().removeClass('hidtxt hidicon');
				}else if(zoom >= 0.3){
					$.each(graph.nodes(), function(i,n){
						n.removeClass('showbigger showsmall');
						if(n.hasClass('shownormal') && !enforce)return;
						n.addClass('shownormal');
						n.style({
							'background-image': mining.mappingutils.getGraphIcon(n.data().data, graphConfig.snapshot ? 'small' : 'big')
						});
					});
					graph.elements().addClass('hidtxt');
					graph.elements().removeClass('hidicon');
				}else{
					$.each(graph.nodes(), function(i,n){
						n.removeClass('showbigger shownormal');
						if(n.hasClass('showsmall') && !enforce)return;
						n.addClass('showsmall');
						n.style({
							'background-image': mining.mappingutils.getGraphIcon(n.data().data, 'smaller')
						});
					});
					graph.elements().addClass('hidtxt hidicon');
				}
			}, 100);
		}
		
		/* 获取class名 */
		//class三部分组成：实例类型[entity | event | relation] + 主类型名称[label] + 类型名称[label + type] 
		var getClasses = function(data){
			return data.etype + ' ' + data.label + ' ' + mining.mappingutils.getName(data) + ' ' + (data.class ? data.class : '');
		}
		
		/* 获取显示label */
		var getShowName = function(data, key){
			var labelArr = mining.mappingutils.getShowlabel(data, key),
				labels = [];
				
			$.each(labelArr, function(i,n){
				labels.push(n.value);
			});
			
			return labels.join('\n');
		}
		
		/* 添加数据 */
		var appendData = function(data, selected){
			//seajs.log(data);
			var tempDataArr = [], 
				nodeIdArr = [],
				poArr = [], 
				po = graph.nodes().length > 0 ? (!mining.utils.isEmpty(graph.$(':selected').position()) ? graph.$(':selected').position() : graph.nodes()[0].position()) : {x: 0, y: 100},
				sum = 0, //生成节点数
				w = 123, //节点宽
				h = 39, //节点高
				r_inside = 300, //内环半径
				r_inc = w, //半径增量
				α_inc = 30, //角度增量
				c_num = 0, //层数
				r = 750, //半径
				α = 360/sum; //角度
			
			//事件扩展调整
			try{
				if(data.v[0].etype == 'event'){
					r_inside = 150;
					r_inc = 100;
				}
			}catch(e){}
			selected = mining.utils.isEmpty(selected) ? true : selected;
			$.each(data.v, function(i, n){
				if(graph.$('#'+n.gid).length < 1){
					nodeIdArr.push(String(n.gid));
				}
			});
			sum = nodeIdArr.length;
				
			//生成节点
			var αArr = [0, 15];
			var α_incArr = [30, 30];
			var c_numArr = [12];
			for(var i = 0; i< sum; i++){
				var _sum = c_numArr[c_numArr.length-1];
				if(i > _sum)c_numArr.push(_sum * 2);
			}
			for(var i = 1; i < c_numArr.length; i++){
				αArr.push(αArr[αArr.length-1] / 2);
				α_incArr.push(α_incArr[α_incArr.length-1] / 2);
			}
	
			var ids = [];
			$.each(data.e, function(i, n){
				n.etype = n.etype ? n.etype : 'relation';
				if(!n.time)n.time = n.start;//TODO
				tempDataArr.push({
					group:'edges', 
					data: {
						id: String(n.gid), 
						source: String(n.from), 
						target: String(n.to), 
						data: n, 
						etype: n.etype,
						event: (mining.utils.isEmpty(n.showlabel) ? getShowName(n) : n.showlabel) 
					}, 
					classes: getClasses(n),
					selected: selected
				});
				ids.push(n.gid);
			});
			$.each(data.v, function(i, n){
				if(nodeIdArr.indexOf(String(n.gid)) == -1)return;
				if(i >= c_numArr[c_num])c_num++;
				
				α = α_incArr[c_num] * i + αArr[c_num];
				while(α >= 360){
					α -= 360;
				}
				//seajs.log(α);
				r = r_inside + c_num * r_inc;
				
				/*{"x1":0,"x2":1920,"y1":0,"y2":804,"w":1920,"h":804}
				{"x1":0,"x2":1920,"y1":0,"y2":804,"w":1920,"h":804}
				{"x1":323.5774805351167,"x2":1651.8929446994744,"y1":130.97183735945197,"y2":687.2039379782768,"w":1328.3154641643578,"h":556.2321006188249}
				{"x1":0,"x2":1920,"y1":0,"y2":804,"w":1920,"h":804}*/
				
				/*poArr.push({x:po.x + r * Math.cos(α * 3.14 / 180) , y:po.y + r * Math.sin(α * 3.14 / 180)});*/
				poArr.push(n.position);
				
				n.etype = n.etype ? n.etype : 'entity';
				if(!n.time)n.time = n.start;//TODO
				tempDataArr.push({
					group: 'nodes', 
					data: { 
						id: String(n.gid), 
						name: getShowName(n), 
						showbigger: getShowName(n, 'show_bigger'), 
						data: n, 
						etype: n.etype
					}, 
					position:{
						x: po.x, 
						y: po.y
					},
					/*classes: getClasses(n),*/
					classes: n.classes,
					selected: selected,
					style: {
						'background-image': mining.mappingutils.getGraphIcon(n, graphConfig.snapshot ? 'normal' : 'big')
					}
				});
			});
			graph.add(tempDataArr);
			refreshGraph();
			graph.$('.mouseover').removeClass('mouseover');
			//展示节点
			var index = 0;
			for(var i = 0; i < nodeIdArr.length; i++){
				graph.$('#'+nodeIdArr[i]).animate({
					renderedPosition: poArr[i]
				},{
					duration: 0,
					complete: function(e){
						index++;
						if(index == sum){
							var nodePo = getBoundingBox(),
								graphPo = graph.extent();
								
							if(nodePo.x1 < graphPo.x1 || nodePo.x2 > graphPo.x2 || nodePo.y1 < graphPo.y1 || nodePo.y2 > graphPo.y2){
								graph.animate({
									fit: {padding:20}
								},{
									duration: 300,
									complete: function(){
										graph.resize();
										if(graphConfig.snapshot)mining.utils.saveGraphHistory(graph);
									}
								});
							}else{
								graph.resize();
								if(graphConfig.snapshot)mining.utils.saveGraphHistory(graph);
							}
						}
					}
				});
			}
		}
		
		/* 获取选择集边界 */
		var getBoundingBox = function(nodes){
			var _xArr = [], _yArr = [];
			if(mining.utils.isEmpty(nodes))nodes = graph.nodes();
			$.each(nodes,function(i,n){
				if(mining.utils.isEmpty(n.position()))return;
				_xArr.push(n.position().x);
				_yArr.push(n.position().y);
			});
			return {x1:_xArr.min(), y1:_yArr.min(), x2:_xArr.max(), y2:_yArr.max()}
		}
		
		/* 初始化快照 */
		var initSnapshot = function(fromhistory){
			fromhistory = fromhistory || false;
			
			var snapshot = mining.utils.localStorage(mining.localname.graphSnapshot);
			
			if(!snapshot){
				if(fromhistory)mining.utils.openGraphHistory(graph, 'final', refreshGraph);
				return;
			}
			mining.utils.localStorage(mining.localname.graphSnapshot, null);
			mining.utils.openGraphSnapshot(graph, snapshot.graph, snapshot.action);
			zoomUpdate(true);
			//保存历史记录
			setTimeout(function(){
				mining.utils.saveGraphHistory(graph);
			}, 300);
			refreshGraph();
		}
		
		/* 刷新图数据 */
		var datatimer, selecttimer = -1, interval = 50, selecting = false;
		var refreshGraph = function(type){
			if(type == 'select'){
				if(graphConfig.selectCallback)graphConfig.selectCallback.call();
				return;
			}
			zoomUpdate();
			clearTimeout(datatimer);
			datatimer = setTimeout(function() {
				refreshEvent();
				if(graphConfig.dataCallback)graphConfig.dataCallback.call();
			}, interval);
		}
		
		/* 选择集变化回调 */
		var selectCallback = function(){
			if(scopa_timelineaction) return;
			if(!scopa_infosideaction && graphConfig.selectCallback){
				graphConfig.selectCallback.call();
			}
			scopa_infosideaction = false;
		}
		
		/* 刷新事件 */
		var refreshEvent = function(){
			$.each(graph.elements(), function(i,n){
				n.off('mouseover mouseout click select unselect lock unlock').on({
					mouseover: function(){
						n.addClass('mouseover');
					},
					mouseout: function(){
						n.removeClass('mouseover');
					},
					select: function(){
						if(selecting || selecttimer != -1)return;
						selecttimer = setTimeout(function() {
							refreshSelection();
							clearTimeout(selecttimer);
							selecttimer = -1;
						}, interval);
					},
					unselect: function(){
						if(selecting || selecttimer != -1)return;
						selecttimer = setTimeout(function() {
							refreshSelection();
							clearTimeout(selecttimer);
							selecttimer = -1;
						}, interval);
					},
					lock: function(){
						if(n.isNode()){
							n.data().data.locked = true;
							n.style({
								'background-image': mining.mappingutils.getGraphIcon(n.data().data, getZoomLevel())
							});
						}
					},
					unlock: function(){
						if(n.isNode()){
							n.data().data.locked = false;
							n.style({
								'background-image': mining.mappingutils.getGraphIcon(n.data().data, getZoomLevel())
							});
						}
					}
				});
			});
		}
		
		/* 刷新选择集 */
		var refreshSelection = function(){
			if(scopa_infosideaction)return;
			selecting = true;
			$.each(graph.elements(':selected'), function(i,n){
				if(n.isNode()){
					if(n.hasClass('event')){
						n.connectedEdges('.event').select();
					}else{
						n.connectedEdges().select().connectedNodes('.event').select();
					}
				}else{
					if(n.hasClass('event')){
						n.connectedNodes('.event').select();
					}
				}
			});
			if(scopa_timelineaction){
				graph.elements(':selected.nofilter').unselect();
			}
			if(graphConfig.selectCallback)graphConfig.selectCallback();
			selecting = false;
		}
		
		/* 布局变换 */
		var changeLayout = function(name){
			if(graph.nodes(':selected').length > 1){
				graph.nodes(':selected').layout($.extend({}, graphLayout[name], {
					boundingBox: getBoundingBox(graph.nodes(':selected')),
					stop: function(){
						
					}
				}));
			}else{
				graph.layout($.extend({}, graphLayout[name], {
					boundingBox: undefined,
					stop:  function(){
						var nodePo = getBoundingBox(),
							graphPo = graph.extent();
							
						if(nodePo.x1 < graphPo.x1 || nodePo.x2 > graphPo.x2 || nodePo.y1 < graphPo.y1 || nodePo.y2 > graphPo.y2){
							graph.animate({
								fit: {padding:20},
								center: {}
							},{
								duration: 300
							});
						}
					}
				}));
			}
		}
		
		/* 删除元素 */
		var deleteElements = function(selector){
			selector = selector || 'all';	//all | :selected | :unselected ...
			if(selector == 'all'){
				graph.elements(':unlocked').remove();
			}else{
				graph.$(selector).filter(':unlocked').remove();
			}
			refreshGraph();
			mining.utils.localStorage(mining.localname.mapSnapshot, mining.mappingutils.getGraphSnapshot(graph));
			mining.utils.saveGraphHistory(graph);
		}
		
		/* 时间筛选 */
		var timeFilter = function(range, labels){
			graph.elements().filterFn(function(ele){
				return ele.connectedEdges('.relation').length < 1;
			}).addClass('nofilter');
			
			$.each(graph.$('edge.relation,node.event'), function(i,n){
	  			var data = n.data().data,
	  				label = mining.mappingutils.getName(data);
	  				
				if(!data.time) return;
	  			$.each(data.time.split(',') || [], function(k,o){
	  				var d = new Date(parseInt(o));
	  				
	  				if(labels.indexOf(label) != -1 && range[0] <= d && d <= range[1]){
		  				n.union(n.connectedNodes()).removeClass('nofilter');
		  				if(n.hasClass('event')){
		  					n.connectedEdges().removeClass('nofilter').connectedNodes().removeClass('nofilter');
		  				}
		  				return false;
		  			}else{
		  				n.addClass('nofilter');
		  				n.connectedNodes().filterFn(function(ele){
		  					return ele.connectedEdges('.nofilter').length == ele.connectedEdges().length;
		  				}).addClass('nofilter');
		  			}
	  			});
	  		});
		}
		
		
		return {
			init: initGraph,
			refresh: refreshGraph,
			snapshot: initSnapshot,
			appenddata: appendData,
			layout: changeLayout,
			delelements: deleteElements,
			timefilter: timeFilter
		}
	}
});
