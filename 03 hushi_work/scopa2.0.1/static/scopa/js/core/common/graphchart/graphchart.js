define(function(require, exports, module){
	
	/**
     * @name graphChart
     * @class 提供图分析相关功能[init/refresh/snapshot/appenddata/layout/delelements/timefilter]。
     * @requires cytoscape, cytoscape-navigator, cytoscape-panzoom
     */
    var cytoscape = require('cytoscape');
	var navigator = require('cytoscape-navigator');
	var panzoom = require('cytoscape-panzoom');
	var cytoscape = require('cytoscape');
	var cyqtip = require('cytoscape-qtip');

	require('cytoscape-navigatorcss')
	require('cytoscape-panzoomcss')
	
	navigator(cytoscape, $);
	panzoom(cytoscape, $);
	cyqtip(cytoscape, $);
	
	
	module.exports = function(){
		var graphConfig = {
			container: $('#graphChart'),
			layout: 'circle',
			elements: {nodes:[]},
			zoom: 1,
			minZoom: 0.1,
			maxZoom: 6,
			animate: 300,
			snapshot: false, //是否检测快照
			navigator: false, //是否支持导航
			panzoom: false,	//是否支持缩放
			shownormal: false,//临时控制icon展示
			readyCallback: null,
			selectCallback: null,
			resizeCallback: null,
			clickCallback: null,
			dblclickCallback: null,
			dataCallback: null,
			zoombig: 1,
			zoomnormal: 0.5,
			zoomsmall: 0.2,
			eventchart: null,
			noteschart: null
		},
		notedArr = [];//便签
		
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
				style: graphStyle,
				layout: $.extend({}, graphLayout[op.layout], { animate:false}),
				ready: function(evt){
					graph = this;
					if(graph.elements().length > 0){
						//graph.startBatch();
						graph.animate({
							zoom: op.zoom,
							pan: {x:0, y:0}
						},{
							duration: op.animate
						});
						//graph.endBatch();
					}else{
						graph.zoom(1);
					}
					if(!mining.utils.isEmpty(op.elements))refreshGraph();
					if(op.readyCallback)op.readyCallback.call(this, graph);
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
			  	selectionType: 'single',
			  	touchTapThreshold: 8,
			  	desktopTapThreshold: 4,
			  	autolock: false,
			  	autoungrabify: false,
			  	autounselectify: false,
			  	
			  	// rendering options:
			  	headless: false,
	  			styleEnabled: true,
	  			hideEdgesOnViewport: false,
	  			hideLabelsOnViewport: true,
	  			textureOnViewport: false,
	  			motionBlur: false,
				motionBlurOpacity: 0.2,
	  			wheelSensitivity: 1,
	  			pixelRatio: 1,
				initrender: function(evt){ /* ... */ },
	  			renderer: { /* ... */ }
			});
	
			if(op.navigator){
				//初始化导航器
				var navTop = $container.height() - 160,
					navLeft = $container.width() - 220;
					
				$container.after('<div class="graphnavigator box-shadow" style="top:' + navTop + 'px;left:' + navLeft + 'px;"><div class="cytoscape-navigator"></div><div class="cytoscape-navigatorTitle">导航器</div></div>');
				var $graphnav = $container.siblings('.graphnavigator');
				
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
				$graphnav.draggable({
					handle: '.cytoscape-navigatorTitle',
					opacity: 0.6,
					containment: 'parent'
				});
				
				mining.utils.winResize({
					name: function(){
						$graphnav.animate({top:$container.height() - 160,left:$container.width() - 220},10);
					}
				}, false);
				$('.graphnavigator').on('mouseup',function(){
					mining.utils.serverLog(28);//用户行为记录
				});
			}
			
			if(op.panzoom){
				//初始化缩放控制
				var panzoomDef = {
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
				}
				graph.panzoom(panzoomDef);
				$container.on('click', '.'+panzoomDef.sliderHandleIcon+',.'+panzoomDef.zoomInIcon+',.'+panzoomDef.zoomOutIcon+',.'+panzoomDef.resetIcon,function(){
					mining.utils.serverLog(27);//用户行为记录
				});
			}
			
			//监听缩放变换展示
			graph.on('zoom', function(){
				if(graphConfig.noteschart)graphConfig.noteschart.close();
				zoomUpdate();
			});
			graph.on('mousedown', function(e){
				$('#graphChart').addClass('mousedown');
			});
			graph.on('pan', function(){
				if(graphConfig.noteschart)graphConfig.noteschart.close();
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
				if(window.SCOPA_ChartResize_timer_run)return;
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
			
			$(document).off('keydown.graphchart').on('keydown.graphchart', function(e){
				if(e.keyCode == mining.keyCode.SHIFT){
					graph.boxSelectionEnabled(true);
				}
			});
			$(document).off('keyup.graphchart').on('keyup.graphchart', function(e){
				if(e.keyCode == mining.keyCode.SHIFT){
					graph.boxSelectionEnabled(false);
					graph.userPanningEnabled(true)
				}
			});
		}
		
		/* 缩放变化回调 */
		var getZoomLevel = function(){
			var zoom = graph.zoom();
			
			if(zoom > graphConfig.zoombig){
				return 'big';
			}else if(zoom >= graphConfig.zoomnormal){
				
				return graphConfig.snapshot ? 'normal' : 'big';
			}else if(zoom >= graphConfig.zoomsmall){
				return graphConfig.snapshot ? 'small' : 'normal';
			}else{
				return 'smaller';
			}
		}
		var zoomtimer, zoomtimegap = 300;
		var zoomUpdate = function(){
			if(window.scopa_snapshotaction)return;
			clearTimeout(zoomtimer);
			zoomtimer = setTimeout(updateViews, zoomtimegap);
		}
		
		var updateViews = function(){//瓶颈2 TODO
			console.time('graphchart-updateViews');
			if(graph.elements().length > mining.graphMaxMnu/3)return;
			var zoom = graph.zoom();
			if(zoom > graphConfig.zoombig){
				graph.elements().addClass('showbigger').removeClass('shownormal showsmall hidtxt hidicon');
			}else if(zoom >= graphConfig.zoomnormal){
				graph.elements().addClass('shownormal').removeClass('showbigger showsmall hidtxt hidicon');
			}else if(zoom >= graphConfig.zoomsmall){
				graph.elements().addClass('shownormal hidtxt').removeClass('showbigger showsmall hidicon');
			}else{
				graph.elements().addClass('showsmall hidtxt hidicon').removeClass('showbigger shownormal');
			}
			updateNodeImg();
			console.timeEnd('graphchart-updateViews');
		}
		
		/* 获取class名 */
		//class三部分组成：实例类型[entity | event | relation] + 主类型名称[label] + 类型名称[label + type] 
		var getClasses = function(data){
			var classArr = [];
			
			classArr.push(data.etype, data.label, mining.mappingutils.getName(data));
			if(data.class)classArr.push(data.class);
			if(data.label == 'person' && data.PERSON_xb == '女')classArr.push('women');
			if(data.specficType == 'custom')classArr.push('new')

			return classArr.join(' ');
		}
		
		/* 获取显示label */
		var getShowName = function(data, key){//瓶颈 1000点边优化至1.66s
			
			var labelArr = mining.mappingutils.getShowlabel(data, key),
				labels = [];
			$.each(labelArr, function(i,n){
				labels.push(n.value);
			});
			
			return labels.join('\n');
		}
		
		var getNodeData = function(data, nodepos, selected){
			var shownormal = getShowName(data),
				showbigger = window.SCOPA_GraphChart_AddMore ? shownormal : getShowName(data, 'show_bigger');
				
			data.etype = data.etype ? data.etype : (mining.mappingutils.getType(data) || 'entity');
			//便签
			if(notedArr.length > 0)data.noted = notedArr.indexOf(data.gid.toString()) != -1 ? true : false;
			return {
				group: 'nodes', 
				data: {
					id: String(data.gid), 
					name: shownormal, 
					showbigger: (!mining.utils.isEmpty(showbigger) ? showbigger : shownormal),
					data: data, 
					etype: data.etype,
					image: mining.mappingutils.getGraphIcon(data)
				}, 
				position: nodepos || {x:100, y:100}, 
				classes: getClasses(data),
				selected: selected || false
			}
		}
		var getEdgeData = function(data, selected){
			var shownormal = getShowName(data),
				showbigger = window.SCOPA_GraphChart_AddMore ? shownormal : getShowName(data, 'show_bigger');
			
			data.etype = data.etype ? data.etype : 'relation';
			return {
				group:'edges', 
				data: {
					id: String(data.gid), 
					source: String(data.from), 
					target: String(data.to), 
					data: data, 
					etype: data.etype,
					event: (mining.utils.isEmpty(data.showlabel) ? shownormal : data.showlabel),
					showbigger: (!mining.utils.isEmpty(showbigger) ? showbigger : shownormal)
				}, 
				classes: getClasses(data),
				selected: selected
			}
		}
		
		/* 添加数据 */
		var graphelementLen = 0, α_random = r_random = 0;
		var appendData = function(data, selected){
			window.SCOPA_GraphChart_AddMore = false;
			graphelementLen = graph.elements().length;
			try{
				if(data.e)graphelementLen += data.e.length;
				if(data.v)graphelementLen += data.v.length;
			}catch(e){}
			if(graphelementLen > mining.graphMaxMnu){
				$dialog.confirm({
					id: 'appendDataDlg',
					title: '图析数据',
			        content: '添加新数据后图析元素将多于 <b>' + mining.graphMaxMnu + '</b>，影响您的操作体验，您确定要继续添加吗？',
			        ok: function(){
			        	if(mining.utils.isEmpty(data) || mining.utils.isEmpty(data.v))return;
			        	window.SCOPA_GraphChart_AddMore = true;
			        	mining.utils.modalLoading();
		        		setTimeout(function(){
		        			appendData2(data, selected);
		        		},10);
			        },
			        onshow: function(){
			        	mining.utils.modalLoading('close');
			        }
				});
			}else{
				appendData2(data, selected);
			}
		}
		var appendData2 = function(data, selected){
			if(graphelementLen > 500){
				mining.utils.modalLoading();
				mining.utils.loadingMsg('绘制图析数据，请您稍等......');
			}
			console.time('graphchart-render')
			var tempDataArr = [], 
				nodeIdArr = [],
				poArr = [], 
				po = {x: 0, y: 100},
				sum = 0, //生成节点数
				w = 123, //节点宽
				h = 39, //节点高
				r_inside = 300, //内环半径
				r_inc = w, //半径增量
				α_inc = 30, //角度增量
				c_num = 0, //层数
				r = 750, //半径
				α = 360/sum, //角度
				showme = true,
				errIds = [],
				mnode = null;
			
			notedArr = [];//便签
			if(data.v && data.v.length > 200){
				showme = false;
			}else{
				showme = true;
			}
			
			//确定中心节点坐标
			if(graph.nodes().length > 0){
				if(data.v){
					var findpo = false;
					$.each(data.v, function(i,n){
						var _this = graph.$('#' + n.gid);
						if(_this.length > 0 && _this.selected()){
							mnode = _this;
							findpo = true;
							return false;
						}
					});
					if(!findpo && data.e && data.e.length > 0 && graph.$('#' + data.e[0].from).length > 0){
						mnode = graph.$('#' + data.e[0].from)
					}
				}else{
					mnode = graph.$(':selected').length > 0 ? graph.$(':selected') : graph.nodes()[0];
				}
			}
			if(mnode)po = mnode.position();
			//openEventChart(mnode, data);
			
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
					if(mining.utils.isEmpty(n.type)){
						errIds.push(n.gid);
						return;
					}
					nodeIdArr.pushOnly(String(n.gid));
				}
			});
			sum = nodeIdArr.length;
			
			//便签
			if(data.v && data.v.length > 0 && graphConfig.noteschart){
				graphConfig.noteschart.isNoted({
					dataIds: nodeIdArr,
					async: false,
					callback: function(result){
						notedArr = result.listObj;
					}
				});
			}
			
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
	
			console.time('graphchart-render-mapEdges')	
			if(data.e){
				$.each(data.e, function(i, n){
					n.etype = n.etype ? n.etype : 'relation';
					if(n.label != 'harts' && mining.utils.isEmpty(n.type) && n.etype != 'event')return;
					if(errIds.length && (errIds.indexOf(n.from) != -1 || errIds.indexOf(n.to) != -1)){
						return;
					}
					if(selected && graph.$('#' + n.gid).length > 0){
						try{
							scopa_infosideaction = true;
							graph.$('#' + n.gid).select();
							setTimeout(function(){scopa_infosideaction = false;},300);
						}catch(e){}
					}
					
					//harts边rule_ids为空时的处理 TODO
					if(n.label == 'harts')mining.mappingutils.setRuleIds(n);
					
					tempDataArr.push(getEdgeData(n, selected));
					/*var shownormal = getShowName(n),
						showbigger = window.SCOPA_GraphChart_AddMore ? shownormal : getShowName(n, 'show_bigger');
					
					tempDataArr.push({
						group:'edges', 
						data: {
							id: String(n.gid), 
							source: String(n.from), 
							target: String(n.to), 
							data: n, 
							etype: n.etype,
							event: (mining.utils.isEmpty(n.showlabel) ? shownormal : n.showlabel),
							showbigger: (!mining.utils.isEmpty(showbigger) ? showbigger : shownormal)
						}, 
						classes: getClasses(n),
						selected: selected
					});*/
				});
			}
			console.timeEnd('graphchart-render-mapEdges')	
			console.time('graphchart-render-mapNodes')
			α_random = mining.utils.random(0,30);//角度随机值
			r_random = mining.utils.random(-50,50);//距离随机值
			if(data.v){
				var intempIdArr = [];
				$.each(data.v, function(i, n){
					var sId = String(n.gid);
					if(intempIdArr.indexOf(sId) != -1 || nodeIdArr.indexOf(sId) == -1 || (n.label != 'harts' && mining.utils.isEmpty(n.type))){
						if(selected){
							try{
								scopa_infosideaction = true;
								graph.$('#' + n.gid).select();
								setTimeout(function(){scopa_infosideaction = false;},300);
							}catch(e){}
						}
						return;
					}
					if(i >= c_numArr[c_num])c_num++;
					
					α = α_incArr[c_num] * i + αArr[c_num] + α_random;
					while(α >= 360){
						α -= 360;
					}
					r = r_inside + c_num * r_inc + r_random;
					
					poArr.push({x:po.x + r * Math.cos(α * 3.14 / 180) , y:po.y + r * Math.sin(α * 3.14 / 180)});
					if(showme){
						nodepos = {
							x: po.x, 
							y: po.y
						}
					}else{
						nodepos = poArr[poArr.length -1];
					}
					
					tempDataArr.push(getNodeData(n, nodepos, selected));
					/*n.etype = n.etype ? n.etype : (mining.mappingutils.getType(n) || 'entity');
					var shownormal = getShowName(n),
						showbigger = window.SCOPA_GraphChart_AddMore ? shownormal : getShowName(n, 'show_bigger');
					tempDataArr.push({
						group: 'nodes', 
						data: {
							id: sId, 
							name: shownormal, 
							showbigger: (!mining.utils.isEmpty(showbigger) ? showbigger : shownormal),
							data: n, 
							etype: n.etype,
							image: mining.mappingutils.getGraphIcon(n)
						}, 
						position: nodepos, 
						classes: getClasses(n),
						selected: selected
					});*/
					intempIdArr.push(sId);
				});
			}
			console.timeEnd('graphchart-render-mapNodes')	
			console.time('graphchart-render-addData')
			graph.add(tempDataArr);
			window.SCOPA_GraphChart_AddMore = false
			console.timeEnd('graphchart-render-addData')
			console.timeEnd('graphchart-render')
			refreshGraph();
			graph.$('.mouseover').removeClass('mouseover');
			if(!showme || nodeIdArr.length < 1){
				adjustZoom();
				return;
			}
			//展示节点
			var index = 0;
			for(var i = 0; i < nodeIdArr.length; i++){
				graph.$('#'+nodeIdArr[i]).animate({
					position: poArr[i]
				},{
					duration: 300,
					complete: function(e){
						index++;
						if(index == sum){
							adjustZoom();
						}
					}
				});
			}
		}
		
		var adjusttimer, adjusttimegap = 300;
		var adjustZoom = function(){
			clearTimeout(adjusttimer);
			adjusttimer = setTimeout(function(){
				setTimeout(function(){
					if(graph.elements().length > mining.graphMaxMnu/3){
						graph.fit();
					}else if(graph.nodes().length < 4){
						graph.animate({
							zoom: 1.1,
							center: true
						},{
							duration: 300
						});
					}else{
						graph.animate({
							fit: {padding:20}
						},{
							duration: 300
						});
					}
				}, 1);
				//graph.resize();
				if(graphConfig.snapshot)mining.utils.saveGraphHistory(graph);
			}, adjusttimegap);
		}
		var adjustZoom2 = function(){
			clearTimeout(adjusttimer);
			adjusttimer = setTimeout(function(){
				console.time('graphchart-adjustZoom')
				var nodePo = getBoundingBox(),
					graphPo = graph.extent();
					
				if(nodePo.x1 < graphPo.x1 || nodePo.x2 > graphPo.x2 || nodePo.y1 < graphPo.y1 || nodePo.y2 > graphPo.y2){
					if(graph.elements().length > mining.graphMaxMnu/3)graph.startBatch();
					graph.animate({
						fit: {padding:20}
					},{
						duration: 300,
						complete: function(){
							//graph.resize();
							if(graphConfig.snapshot)mining.utils.saveGraphHistory(graph);
							mining.utils.modalLoading('close');
						}
					});
					if(graph.elements().length > mining.graphMaxMnu/3)graph.endBatch();
				}else{
					//graph.resize();
					if(graphConfig.snapshot)mining.utils.saveGraphHistory(graph);
					mining.utils.modalLoading('close');
				}
				console.timeEnd('graphchart-adjustZoom')
			}, adjusttimegap);
		}
		
		var openEventChart = function(mnode, data){
			var eventArr = [];
			if(data.v){
				$.each(data.v, function(i,n){
					n.etype = n.etype ? n.etype : (mining.mappingutils.getType(n) || 'entity');
					if(n.etype == 'event'){
						eventArr.push(mining.utils.clone(n))
						delete n;
					}
				});
			}
			if(eventArr.length > 0 && graphConfig.eventchart)graphConfig.eventchart(mnode, eventArr);
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
			console.time('graphchart-initSnapshot');
			fromhistory = fromhistory || false;
			
			var snapshot = mining.utils.localStorage(mining.localname.graphSnapshot);
			
			if(!snapshot){
				if(fromhistory)mining.utils.openGraphHistory(graph, 'final', refreshGraph);
				adjustZoom();
				zoomUpdate();
				setTimeout(refreshGraph, 300)
				console.timeEnd('graphchart-initSnapshot');
				return;
			}
			mining.utils.localStorage(mining.localname.graphSnapshot, null);
			mining.utils.openGraphSnapshot(graph, snapshot.graph, snapshot.action);
			zoomUpdate();
			//保存历史记录
			setTimeout(function(){
				mining.utils.saveGraphHistory(graph);
				refreshGraph();
			}, 300);
			console.timeEnd('graphchart-initSnapshot');
		}
		
		/* 刷新图数据 */
		var datatimer, selecttimer = -1, interval = 100, selecting = false;
		var refreshGraph = function(type){
			if(type == 'select'){
				if(graphConfig.selectCallback)graphConfig.selectCallback.call();
				mining.utils.modalLoading('close');
				return;
			}
			zoomUpdate();
			clearTimeout(datatimer);
			datatimer = setTimeout(function() {
				refreshEvent();
				if(graphConfig.dataCallback){
					graphConfig.dataCallback.call();
				}else{
					mining.utils.modalLoading('close');
				}
			}, interval);
		}
		
		/* 选择集变化回调 */
		/*var selectCallback = function(){
			if(scopa_timelineaction) return;
			if(!scopa_infosideaction && graphConfig.selectCallback){
				graphConfig.selectCallback.call();
			}
			scopa_infosideaction = false;
		}*/
		
		/* 刷新事件 */
		var refreshEvent = function(){
			$.each(graph.elements(), function(i,n){
				n.off('mouseover mouseout click select unselect lock unlock drag').on({
					mouseover: function(){
						n.addClass('mouseover');
					},
					click: function(e){
						if(window.event.ctrlKey){
							setTimeout(function(){
								n.neighborhood().union(n).select();
							},10);
						}
						if(graphConfig.clickCallback)graphConfig.clickCallback.call(this, e);
						mining.utils.serverLog(48, n.data().name);//用户行为记录
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
					},
					drag: function(){
						if(graphConfig.noteschart)graphConfig.noteschart.close([n.data().data.gid]);
					}
				});
			});
		}
		
		/* 刷新选择集 */
		var refreshSelection = function(){
			if(window.scopa_infosideaction){
				scopa_infosideaction = false;
				return;
			}
			console.time('graphchart-refreshSelection')
			selecting = true;
			var needSelectArr = graph.elements('.needSelectArr');
			$.each(graph.elements(':selected'), function(i,n){
				if(n.isNode()){
					if(n.hasClass('event')){
						//n.connectedEdges('.event').select();
						needSelectArr = needSelectArr.add(n.connectedEdges('.event'));
					}else{
						//n.connectedEdges().select().connectedNodes('.event').select();
						needSelectArr = needSelectArr.add(n.connectedEdges())
						needSelectArr = needSelectArr.add(n.connectedEdges().connectedNodes('.event'))
					}
				}else{
					if(n.hasClass('event')){
						//n.connectedNodes('.event').select();
						needSelectArr = needSelectArr.add(n.connectedNodes('.event'))
					}
				}
			});
			graph.batch(function(){
				needSelectArr.select();
			})
			if(scopa_timelineaction){
				graph.batch(function(){
					graph.elements(':selected.nofilter').unselect();
				})
			}
			if(graphConfig.selectCallback)graphConfig.selectCallback();
			selecting = false;
			console.timeEnd('graphchart-refreshSelection')
		}
		
		/* 布局变换 */
		var changeLayout = function(name){
			if(name == 'auto'){
				var _width = _height = 0, _box = {x1:0, y1:0, x2:0, y2:0}, elements = graph.json().elements, graphData = {edges:[], nodes:[]};
				/*if(graph.nodes(':selected').length > 1 && graph.nodes(':selected').length != graph.nodes().length){
					var _box = getBoundingBox(graph.nodes(':selected'));
					_width = _box.y2 - _box.y1;
					_height = _box.x2 - _box.x1;
					$.each(elements.nodes, function(i,n){
						if(n.selected)graphData.nodes.push(n);
					});
					$.each(elements.edges, function(i,n){
						if(n.selected)graphData.edges.push(n);
					});
				}else{*/
					_width = $('#graphChart').width();
					_height = $('#graphChart').height();
					graphData = elements;
				/*}*/
				
				/* 力导布局
		      	 * 接口http://qbscopa16.sjz.eb/analysis/services/analysis/layout
					参数调整为：
					width int
					height int
					graphData JSONObject
					layout 默认值KKLayout 可选值KKLayout
					grouper 默认值 DefaultGrouper 可选值DefaultGrouper CircularGrouper
					centrality 默认值 DegreeCentrality 可选值DegreeCentrality ClosenessCentrality BetweennessCentrality ClusteringCoefficient*/
				
				$ajax.ajax({
					//url: mining.baseurl.analysis + '/layout',
					url: mining.baseurl.host+'/tuning/services/olap/analysis/layout',
					data: {
						width: _width,
						height: _height,
						graphData: JSON.stringify(graphData),
						grouper: 'CircularGrouper'
					},
					type: 'post',
					success: function(data){
						//graph.startBatch();
						$.each(data.content.v, function(i,n){
							graph.$('#'+n.id).animate({
								position: {
									x: n.x + _box.x1, 
									y: n.y + _box.y1
								}
							},{
								duration: 300,
								complete: function(){
								}
							});
						});
						//graph.endBatch();
						mining.utils.saveGraphHistory(graph);
					},
					error: function(data){
						seajs.log(data);
					}
				});
				return;
			}
			if(graph.nodes(':selected').not(':locked').length > 1 && graph.nodes(':selected').not(':locked').length != graph.nodes().length && name != 'breadthfirst'){
				var box = getBoundingBox(graph.nodes(':selected').not(':locked'));
				
				if(name == 'grid'){
					var gap = graph.nodes(':selected').not(':locked').length * 63;
					if(box.x1 == box.x2) box.x2 += gap;
					if(box.y1 == box.y2) box.y2 += gap;
				}
				seajs.log(box)
				graph.nodes(':selected').not(':locked').layout($.extend({}, graphLayout[name], {
					boundingBox:box,
					stop: function(){
						mining.utils.saveGraphHistory(graph);
					}
				}));
			}else{
				graph.layout($.extend({}, graphLayout[name], {
					boundingBox: undefined,
					stop:  function(){
						var nodePo = getBoundingBox(),
							graphPo = graph.extent();
							
						if(nodePo.x1 < graphPo.x1 || nodePo.x2 > graphPo.x2 || nodePo.y1 < graphPo.y1 || nodePo.y2 > graphPo.y2){
							//graph.startBatch();
							graph.animate({
								fit: {padding:20},
								center: {}
							},{
								duration: 300,
								complete: function(){}
							});
							//graph.endBatch();
							mining.utils.saveGraphHistory(graph);
						}else{
							mining.utils.saveGraphHistory(graph);
						}
					}
				}));
			}
		}
		
		/* 删除元素 */
		var deleteElements = function(selector){
			var eles;
			//graph.startBatch();
			selector = selector || 'all';	//all | :selected | :unselected ...
			if(selector == 'all'){
				eles = graph.elements(':unlocked').remove();
			}else{
				if(graph.$('node.event:selected').length < 1){
					eles = graph.$(selector).filter(':unlocked').remove();
				}else{
					var selection = graph.$(selector).filter(':unlocked');
					/*$.each(graph.$('node.event:selected'), function(i,n){
						selection = selection.not(n.connectedEdges());
						selection = selection.not(n.connectedEdges().connectedNodes());
					});*/
					eles = selection.remove();
				}
			}
			graph.removeFromPool(eles);
			//graph.endBatch()
			refreshGraph();
			mining.utils.saveGraphHistory(graph);
		}
		
		/* 时间筛选 */
		var timeFilter = function(range, checkedLabel, uncheckLabel){
			if(graph.elements().length > mining.graphMaxMnu/3)graph.startBatch();
			//①置灰全部元素
			graph.elements().addClass('nofilter');
			
			//②处理孤点
			var snodes = graph.elements('node.entity').filterFn(function(ele){
				return ele.connectedEdges().length < 1;
			});
			
			$.each(snodes, function(i,n){
				var data = n.data().data,
					name = mining.mappingutils.getName(data);
				
				if(checkedLabel.indexOf(name) == -1) return;
				checknodefilter(range, data, n);
			});
			
			//③处理边
			$.each(graph.elements('edge.relation'), function(i,n){
				var data = n.data().data,
					name = mining.mappingutils.getName(data);
				
	  			if(uncheckLabel.indexOf(name) != -1) return;
	  			var timeList = mining.mappingutils.getTimeList(data),filter = false;
  				$.each(timeList, function(j,m){
	  				if(checkedLabel.indexOf(m.label) == -1) return;
		  			$.each(m.time, function(k,o){
		  				var d = new Date(parseInt(o));
		  				
		  				if(range[0] <= d && d <= range[1]){
			  				filter = true;
			  				return true;
			  			}
		  			});
		  			if(filter){
		  				n.removeClass('nofilter');
		  				n.connectedNodes().removeClass('nofilter');
		  				return true;
		  			}
	  			});
			});
			
			//④处理非孤点灰点
			
			var graynodes = graph.elements('node.nofilter').filterFn(function(ele){
				return ele.connectedEdges().length > 0;
			});
			
			$.each(graynodes, function(i,n){
				var data = n.data().data,
					name = mining.mappingutils.getName(data);
				
				if(checkedLabel.indexOf(name) == -1 && uncheckLabel.indexOf(name) == -1){
					n.removeClass('nofilter');
					return;
				}
				checknodefilter(range, data, n);
			});
			if(graph.elements().length > mining.graphMaxMnu/3)graph.endBatch();
		}
		
		var checknodefilter = function(range, data, n){
			var timeList = mining.mappingutils.getTimeList(data), filter = false;
				
			if(mining.utils.isEmpty(timeList))return;
			$.each(timeList, function(j,m){
				if(mining.utils.isEmpty(m.time))return;
				$.each(m.time, function(k,o){
					var d = new Date(parseInt(o));
  				
	  				if(range[0] <= d && d <= range[1]){
		  				filter = true;
		  				return true;
		  			}
				});
			});
			if(filter)n.removeClass('nofilter');
		}
		var timeFilter2 = function(range, labels){
			//graph.startBatch()
			graph.elements().filterFn(function(ele){
				return ele.connectedEdges('.relation').length < 1;
			}).addClass('nofilter');
			//graph.elements().addClass('nofilter');
			$.each(graph.$('node.entity,edge.relation,node.event'), function(i,n){
	  			var data = n.data().data,
	  				timeList = mining.mappingutils.getTimeList(data);
	  			
	  			$.each(timeList, function(j,m){
		  			$.each(m.time, function(k,o){
		  				var d = new Date(parseInt(o));
		  				
		  				if(labels.indexOf(m.label) != -1 && range[0] <= d && d <= range[1]){
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
				
	  		});
	  		//graph.endBatch();
		}
		
		/* 类别筛选 */
		var labelFilter = function(labels){
			if(graph.elements().length > mining.graphMaxMnu/3)graph.startBatch();
			$.each(graph.$('node.entity,edge.relation,node.event'), function(i,n){
	  			var data = n.data().data,
	  				timeList = mining.mappingutils.getTimeList(data);
	  			
	  			$.each(timeList, function(j,m){
	  				if(labels.indexOf(m.label) != -1){
		  				n.addClass('nofilter');
		  				if(n.hasClass('event')){
		  					n.connectedEdges().addClass('nofilter');
		  				}
		  			}
	  			});
	  		});
	  		if(graph.elements().length > mining.graphMaxMnu/3)graph.endBatch();
		}
		
		var closeEvent = function(param){
			console.time('graphchart-closeEvent');
			//if(graph.elements().length > mining.graphMaxMnu/3)graph.startBatch();
			var eles = graph.nodes('.event:selected').not(':locked').remove();
			graph.removeFromPool(eles);
			/*$.each(graph.$('#' + param).connectedEdges('.event'), function(i,n){
				n.connectedNodes('.event').not(':locked').remove();
			});*/
			graphConfig.dataCallback();
			mining.utils.saveGraphHistory(graph);
			//if(graph.elements().length > mining.graphMaxMnu/3)graph.endBatch();
			console.timeEnd('graphchart-closeEvent');
		}
		
		var closeEntity = function(eles){
			console.time('graphchart-closeEntity');
			//if(graph.elements().length > mining.graphMaxMnu/3)graph.startBatch();
			var elements;
			if(eles.filter('.entity').length == 1){
				elements = eles.neighborhood('.entity');
			}else{
				elements = eles.filter('.entity');
				$.each(eles.filter('.entity'), function(i,n){
					elements = elements.add(n.connectedEdges().connectedNodes());
				});
			}
			$.each(elements, function(i,n){
				if(n.connectedEdges().length == 1)n.addClass('closeentitynode');
			});
			var eles = graph.filter('.closeentitynode').not(':locked').remove();
			graph.removeFromPool(eles);
			graphConfig.dataCallback();
			mining.utils.saveGraphHistory(graph);
			//if(graph.elements().length > mining.graphMaxMnu/3)graph.endBatch();
			console.timeEnd('graphchart-closeEntity');
		}
		
		var updateimgtimeout, updateimgtime = 100;
		var updateNodeImg = function(){
			//if(graph.nodes().length > mining.graphMaxMnu/2)return;
			try{clearTimeout(updateimgtimeout)}catch(e){};
			updateimgtimeout = setTimeout(function(){
				console.time('graphchart-updateNodeImg');
				$('.updateNodeImg').remove();
				graph.nodes().each(function(i, ele){
					var data = ele.data()
					
					if(graph.zoom() > graphConfig.zoombig){
						var bigImg = mining.mappingutils.getGraphIcon(data.data, 'big');
						
						if(data.imgchecked || bigImg.indexOf('/graphicon/') != -1){
							ele.style({
								'background-image': bigImg
							}).addClass('nophoto');
							return;
						}
						if(mining.utils.isEmpty(data.image))data.image = bigImg;
						var $img = $('.updateNodeImg[gid=' + data.id+ ']');
							
						if($img.size() < 1)$('body').append('<img src="' + bigImg + '" class="updateNodeImg" gid="' + data.id + '" style="display:none;">');
						$img = $('.updateNodeImg[gid=' + data.id+ ']');
						$img[0].onerror = function(){
							$(this).remove();
						}
						$img[0].onload = function(){
							if(graph.zoom() <= graphConfig.zoombig)return;
							var _node = graph.$('#' + $(this).attr('gid')), _src = this.src;
							
							_node.data().image = _src;
							_node.data().imgchecked = true;
							_node.style({
								'background-image': _src
							});
						}
					}else{
						ele.style({
							'background-image': mining.mappingutils.getGraphIcon(data.data)
						});
					}
				});
				console.timeEnd('graphchart-updateNodeImg');
			}, updateimgtime);
		}
		
		var showHistory = function(type){
			type = type || 'backward';
			mining.utils.openGraphHistory(graph, type, function(){
				refreshGraph()
				zoomUpdate();
			});
		}
		
		var refreshState = function(gid){
			var gidArr = [];
			
			$.each(graph.nodes(), function(i,n){
				gidArr.push(n.data().data.gid);
				n.data().data.noted = false;
			});
			graphConfig.noteschart.isNoted({
				dataIds: gidArr,
				async: false,
				callback: function(result){
					notedArr = result.listObj;
					if(result.listObj){
						$.each(result.listObj, function(i,n){
							graph.$('#' + n).data().data.noted = true;
						});
					}
				}
			});
			updateNodeImg();
		}
		
		
		return {
			init: initGraph,
			refresh: refreshGraph,
			snapshot: initSnapshot,
			appenddata: appendData,
			layout: changeLayout,
			delelements: deleteElements,
			timefilter: timeFilter,
			labelfilter: labelFilter,
			adjustzoom: adjustZoom,
			closeevent: closeEvent,
			closeentity: closeEntity,
			history: showHistory,
			getnodedata: getNodeData,
			getedgedata: getEdgeData,
			refreshstate: refreshState
		}
	}
});
