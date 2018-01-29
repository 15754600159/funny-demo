define(function(require, exports, module){
	
	/**
     * @name Toolbar
     * @class 描述。
     * @requires jquery
     */
    
    var defaultConfig = {
    	map: null,
    	container: null
    },
    requestUrl = {
		circle: mining.baseurl.core + '/map/searchCircle', //vertexGeo: JSON.stringify({lat,lng,radius}),labels
		buffer: mining.baseurl.core + '/map/searchBuffer'  //vertexGeo: JSON.stringify({bufferRadius, points:[{lat, lng}]}),labels
	},
	showModule = require('core/common/showelement'),
	searchLayer = {},
	mapModule,
	eventModule,
    $toolbar,
    map,
    mapscale;//当前地图比例尺（1:***）。例如：1:50000
    
	var initToolbar =  function(config){
		
		config = config || {};
		for(var key in config){
			config[key] = config[key] || defaultConfig[key];
		}
		mapModule = config.mapModule;
		eventModule = config.eventModule;
		map = config.map;
		$toolbar = (typeof config.container == 'string' ? $(config.container) : config.container);
		
		if(mining.utils.isEmpty(map) || $toolbar.size() < 1) return;
		
		map.addMapEventListener(EzEvent.MAP_ZOOMCHANGE, function(e){
	    	getMapScale();
	    	if(searchLayer && searchLayer.refresh){
	    		searchLayer.refresh();
	    	}
	  	});
		
		g_LineColor = '#2d9bf6';
		g_FillColor = '#3e89fa';
			
		//后退
		$('.undo',$toolbar).off('click').on('click', function(){
			mining.utils.openMapHistory(mapModule, 'backward', mapModule.refresh);
			mining.utils.serverLog(56);//用户行为记录
		});
		
		//前进
		$('.redo',$toolbar).off('click').on('click', function(){
			mining.utils.openMapHistory(mapModule, 'forward', mapModule.refresh);
			mining.utils.serverLog(57);//用户行为记录
		});
		//权限
		if(!mining.utils.hasRoleForAction('radiusSearch')){
			$('.circlesearch',$toolbar).addClass('hide');
		}
		if(!mining.utils.hasRoleForAction('pathSearch')){
			$('.pathsearch',$toolbar).addClass('hide');
		}
		//
		//半径搜索
		$('.circlesearch',$toolbar).off('click').on('click', function(e){
			closeOverlay();
			$(this).addClass('active');
			map.changeDragMode("drawCircle", null, null, scopasearchcomplete);
			//rgb(62, 137, 250)
			mining.utils.serverLog(58);//用户行为记录
		});
		
		//路径搜索
		$('.pathsearch',$toolbar).off('click').on('click', function(e){
			closeOverlay();
			$(this).addClass('active');
			map.changeDragMode("drawPolyline", null, null, scopasearchcomplete);
			/*drawingManager.open();
			drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);*/
			mining.utils.serverLog(59);//用户行为记录
		});
		
		//轨迹拟合
		$('.formatpath',$toolbar).off('click').on('click', function(e){
			if(dmap.$(':selected').length < 2) return;
			var nodeArr = [], pathArr = [];
			$.each(dmap.$(':selected'), function(i,n){
				if(!mining.utils.isEmpty(n.data().data.time)) nodeArr.push(n);
			});
			nodeArr.sort(function(a,b){return parseInt(a.data().data.time) > parseInt(b.data().data.time) ? 1 : -1});
			$.each(nodeArr, function(i,n){
				var geo = n.data().data.geo;
				pathArr.push(new BMap.Point(parseFloat(geo.lng), parseFloat(geo.lat)));
			});
			map.addOverlay(new BMap.Polyline(pathArr, {strokeColor:"#2d9bf6", strokeWeight:5, strokeOpacity:0.8}));
		});
		
		//显示到图析
		$('.viewgraph',$toolbar).off('click').on('click', function(e){
			var nodes = [],nameArr = [];
			
			$.each(map.elements(), function(i,n){
				if(n.selected){
					var data = n.data().data;
					
					if(data.eventlist)delete data.eventlist;
					nodes.push(data);
					nameArr.push(getShowName(data));
				}
			});
    		mining.utils.stopBubble(e);
    		showModule.show({v:nodes, e:[]}, 'graph');
    		mining.utils.serverLog(60,nameArr.join('；'));//用户行为记录
			/*var elements = {nodes:[], edges:[]};
    		
    		$.each(dmap.$(':selected'), function(i,m){
    			var n = m.data().data;
    			
				elements.nodes.push({
					data: {
						id: String(n.gid), 
						name: getShowName(n), 
						showbigger: getShowName(n, 'show_bigger'), 
						data: n, 
						etype: n.etype,
					}, 
					position:{
						x: 100, 
						y: 100 + (i * 100)
					}, 
					classes: getClasses(n),
					selected: true,
					style: {
						'background-image': mining.mappingutils.getGraphIcon(n)
					}
				});
    		});
    		
    		if(!mining.utils.isEmpty(elements.nodes)){
    			mining.utils.localStorage(mining.localname.graphSnapshot, {
					graph: {elements: elements},
					action: 'import'
				});
				
	    		mining.utils.stopBubble(e);
				mining.utils.hashChange('graph');
    		}*/
		});
	    var getClasses = function(data){
			return data.etype + ' ' + data.label + ' ' + mining.mappingutils.getName(data) + ' ' + (data.class ? data.class : '');
		}
		var getShowName = function(data, key){
			var labelArr = mining.mappingutils.getShowlabel(data, key),
				labels = [];
				
			$.each(labelArr, function(i,n){
				labels.push(n.value);
			});
			
			return labels.join('\n');
		}
		
		//显示到档案
		$('.viewfile',$toolbar).off('click').on('click', function(e){
			var nodes = [],
	    		nameArr = [];
			
			$.each(map.elements(), function(i,n){
				if(n.selected){
					var data = n.data().data;
					
					if(data.eventlist)delete data.eventlist;
					nodes.push(data);
					nameArr.push(getShowName(data));
				}
			});
    		mining.utils.stopBubble(e);
    		showModule.show({v:nodes, e:[]}, 'file');
    		mining.utils.serverLog(61,nameArr.join('；'));//用户行为记录
			/*if(map.$(':selected').length < 1) return;
			
			var snapshotName = mining.localname.fileSnapshot,
	    		transferDataArr = [],
	    		snapshotData;
    		
	    	$.each(map.$(':selected'), function(i,n){
				transferDataArr.push(n.data().data);
			});
			snapshotData = mining.utils.localStorage(snapshotName);
			if(!snapshotData.filelist) snapshotData.filelist = [];
			$.each(transferDataArr, function(i,n){
				snapshotData.filelist.pushOnly(n);
			});
			mining.utils.localStorage(snapshotName, snapshotData);
			mining.utils.hashChange('file');*/
		});
		
		//查看事件列表
		$('.openevent',$toolbar).off('click').on('click', function(e){
			var nodes = [], nameArr = [];
			
			$.each(map.elements(), function(i,n){
				if(n.selected)nodes.push(n.data().data);
			});
    		mining.utils.stopBubble(e);
    		if(mining.utils.isEmpty(nodes)){
    			$dialog.alert('请选择实体','warning');
    		}
    		$.each(nodes, function(i,n){
    			if(n.eventlist){
    				eventModule.appenddata(n, n.eventlist);
    				nameArr.push(getShowName(n));
    			}
    		});
    		mining.utils.serverLog(62,nameArr.join('；'));//用户行为记录
		});
		
		//选择多个
		$('.select-multi',$toolbar).off('click').on('click', function(){
			var active = $(this).hasClass('active');
			
			closeOverlay();
			if(active){
				$(this).removeClass('active');
				//drawingManager.close();
			}else{
				$(this).addClass('active');
				map.changeDragMode("drawRect", null, null, scoparectanglecomplete);
				/*drawingManager.open();
				drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);*/
			}
			mining.utils.serverLog(63);//用户行为记录
		});
		
		//清空图析
		$('.clearall',$toolbar).off('click').on('click', function(){
			closeOverlay();
			mapModule.clear();
			mining.utils.saveMapHistory(map);
			mining.utils.serverLog(64);//用户行为记录
		});
		
		/* 键盘操作 */
		$(document).off('keydown.maptoolbar').on('keydown.maptoolbar', function(e){
			if(e.keyCode == mining.keyCode.SHIFT && $.hash().indexOf('map') != -1){
				closeOverlay();
				$('.select-multi',$toolbar).addClass('active');
				$(this).addClass('active');
				drawingManager.open();
				drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
			}
		});
		$(document).off('keyup.maptoolbar').on('keyup.maptoolbar', function(e){
			if(e.keyCode == mining.keyCode.SHIFT && $.hash().indexOf('map') != -1){
				closeOverlay();
				$('.select-multi',$toolbar).removeClass('active');
				$(this).removeClass('active');
				drawingManager.close();
			}
		});
		$(document).off('keydown.maptoolbar').on('keydown.maptoolbar', function(e){
			if(e.keyCode == mining.keyCode.DELETE && $.hash().indexOf('map') != -1){
				mapModule.delelements(':selected');
			}
		});
	}
	
	var closeOverlay = function(){
		var layers = map.getOverlays();
		
		for(var i = layers.length - 1; i >= 0; i--){
			if(mining.utils.isEmpty(layers[i].id))map.removeOverlay(layers[i]);
		}
		map.changeDragMode("pan");
		$('.circlesearch,.pathsearch,.select-multi',$toolbar).removeClass('active');
	}
	
	/* 半径搜索 + 路径搜素 */
	var tempLayer;
	window.scopasearchcomplete = function(evt){
		var layers = map.getOverlays(),
			dragMode = title = '',
			evtdata;
		
		getMapScale();
		require('validate');
		if($('.pathsearch').hasClass('active')){
			evtdata = { radius:100, paths:evt.split(',')}
			dragMode = 'path';
			title = '路径搜索';
			searchLayer = {
				getRadius: function(){
					var _r = 0;
					if(tempLayer)_r = parseFloat(tempLayer.getWidth()) * mapscale;
					
					return _r;
				},
				setRadius: function(r){
					evtdata.radius = r * 2 / mapscale;
					if(tempLayer)bdmap.removeOverlay(tempLayer);
					tempLayer = new Polyline(evt,"rgba(45, 155, 246, 0.2)", evtdata.radius,1);
					map.addOverlay(tempLayer);
				},
				getPath: function(){
					var _p = [];
					
					if(tempLayer){
						var points = tempLayer.getCoordSequence().split(','),
							i = 0;
						
						while(i < points.length){
							_p.push({
								lng: points[i],
								lat: points[i+1]
							});
							i += 2;
						}
					}
					
					return _p;
				},
				refresh: function(){
					try{searchLayer.setRadius($($dialog.get('overlaycompleteDialog').node).find('[name=radius]').val());}catch(e){}
				}
			}
			
			searchLayer.setRadius(evtdata.radius);
		}else{
			evtdata = evt.split(',');
			evtdata[2] = parseFloat(evtdata[2] ) * 100000;
			dragMode = 'circle';
			title = '半径搜索';
			searchLayer = {
				point:{
					lng: evtdata[0],
					lat: evtdata[1]
				},
				getRadius: function(){
					var _r = 0;
					if(tempLayer)_r = parseFloat(tempLayer.getRadius()) * 100000;
					
					return _r;
				},
				setRadius: function(r){
					evtdata[2] = r / 100000;
					if(tempLayer)bdmap.removeOverlay(tempLayer);
					tempLayer = new Circle(evtdata.join(','), g_LineColor, 2, 0.5, g_FillColor);
					map.addOverlay(tempLayer);
				}
			};
			for(var i = layers.length - 1; i >= 0; i--){
				if(!mining.utils.isEmpty(layers[i].getRadius)){
					map.removeOverlay(layers[i]);
					break;
				}
			}
			searchLayer.setRadius(evtdata[2]);
		}
		$dialog({
			id: 'overlaycompleteDialog',
    		title: title,
    		width: 300,
    		align: 'left top',
    		onshow: function(){
    			var $dlg = this, $node = $(this.node);
    			
    			require.async('../../graph/graphmenu/contextmenu', function(){
					$node.contextMenu('mapmenu',{
						onShowMenu: function(){
							return '';
						}
					});
				});
    			$node.addClass('popmapsearch');
    			$dlg.content(['<form class="form-horizontal">',
			              		'<div class="form-group">',
					    	    	'<label class="col-sm-3 control-label">半径</label>',
					    	    	'<div class="col-sm-8">',
					    	    		'<div class="input-group">',
      										'<input type="text" name="radius" class="form-control ipt-radius"  placeholder="请输入...">',
      										'<div class="input-group-addon">米</div>',
    									'</div>',
					    	    		'<div class="radius"></div>',
					    	    	'</div>',
					    	  	'</div>',
					    	  	'<div class="form-group">',
					    	    	'<label class="col-sm-3 control-label">类型</label>',
					    	    	'<div class="col-sm-8">',
					    	    		'<input type="text" name="label" class="required" placeholder="请选择..." style="width:190px;">',
					    	    	'</div>',
					    	  	'</div>',
					    	  	'<div class="form-group">',
					    	    	'<label class="col-sm-3 control-label">关键词</label>',
					    	    	'<div class="col-sm-8">',
					    	    		'<input type="text" name="keyword" class="form-control" placeholder="请填写描述..." />',
					    	    	'</div>',
					    	  	'</div>',
				    	  	'</form>'].join(''));
				
				var radius = Math.round(searchLayer.getRadius()),
					minradius = 1, 
					maxradius = radius * 2, 
					radiusChanged = true;
				
				searchLayer.setRadius(radius);
				$('.radius',$node).slider({
				 	range: 'min',
			      	value: radius,
			      	min: minradius,
			      	max: maxradius,
			      	slide: function( event, ui ) {
			      		searchLayer.setRadius(ui.value);
			        	$('[name=radius]',$node).val(ui.value);
			      	}
				});
				var changeRadius = function(){
					if(!radiusChanged) return;
					radiusChanged = false;
					radius = parseInt($('[name=radius]',$node).val());
					if(mining.utils.isEmpty(radius) || radius < 1) radius = 1;
					maxradius = radius * 2
					$('.radius',$node).slider({
						value: radius,
				      	max: maxradius
					});
					searchLayer.setRadius(radius);
					$('[name=radius]',$node).val(radius);
					radiusChanged = true;
				}
				$('[name=radius]',$node).on('change', changeRadius).val(radius);
				var classList = mining.mappingutils.getClassList('entity'), 
					typeData = [];
					
				$.each(classList, function(i,n){
					typeData.push({
						text: n.label_name,
						id: i
					});
				});
				$('[name=label]',$node).select2({
					data: typeData,
			    	dropdownCssClass: 'artui-select2'
		    	}).on('select2-open', function(){
					$(this).siblings('label.error').remove();
				});
    		},
    		okValue: '确定',
    		ok: function(){
    			var $dlg = this, 
    				$node = $(this.node),
    				radius = parseInt($('[name=radius]',$node).val()),
    				labels = $('[name=label]',$node).select2('val'),
    				keyword = $('[name=keyword]',$node).val(),
    				isloading = true,
    				data, url;
    			
    			if(!$('form',$node).valid())return false;
    			if(dragMode == 'circle'){
    				url = requestUrl.circle;
    				data = {
						vertexGeo: JSON.stringify({
							lat: parseFloat(searchLayer.point.lat),
							lng: parseFloat(searchLayer.point.lng),
							radius: radius / 1000
						}),
						labels: labels,
						keyword: keyword
					}
    			}else{
    				url = requestUrl.buffer;
    				data = {
						vertexGeos: JSON.stringify({
							points: searchLayer.getPath(),
							bufferRadius: searchLayer.getRadius() / 1000
						}),
						labels: labels,
						keyword: keyword
					}
    			}
				$ajax.ajax({
					url: url,
					type:'post',
					data: data,
					success: function(data){
						if(!data.v){
							$dialog.alert('未找到任何数据！', 'warning');
							return;
						}
						mapModule.appenddata(data.v);
					},
    				error: function(data){
    					$dialog.alert(data, '范围搜索失败，请稍后重试！', 'error');
    				},
    				complete: function(){
    					isloading = false;
    					mining.utils.modalLoading('close');
    				}
				});
				setTimeout(function(){
					if(!isloading)return;
					mining.utils.modalLoading();
				}, 100);
    		},
    		cancelValue: '取消',
    		cancel: true,
    		onremove: closeOverlay
    	}).show();
	}
	
	var getMapScale = function(){
		var scale = map.getCurrentMapScale().split(':');
		
		mapscale = 10 * scale[1] / 47987.87363881402;
	}
	
	/* 选择多个 */
	var scoparectangletimer;
	window.scoparectanglestate = false;
	window.scoparectanglecomplete = function(evt,a,b,c){
		window.scoparectanglestate = true;
		closeOverlay();
		$.each(map.elements(), function(i,n){
			if(isPointInRect(n.point, evt)){
				n.select();
			}else{
				n.unselect();
			}
		});
		try{clearTimeout(scoparectangletimer)}catch(e){}
		scoparectangletimer = setTimeout(function(){
			window.scoparectanglestate = false;
		},300);
	}
	
	var isPointInRect = function(point, rect){
		var rectP = rect.split(','),
			rectP1 = {x: rectP[0], y: rectP[1]},
			rectP2 = {x: rectP[2], y: rectP[3]};
		
		return !(point.x < rectP1.x || point.x > rectP2.x || point.y < rectP1.y || point.y > rectP2.y);
	}
	
	/*****************************/
	var isSelected = function(node){
		return $(node.content).hasClass('selected')
	}
	var selectNode = function(node){
		node.setContent($(node.content).addClass('selected')[0].outerHTML);
		return node;
	}
	
	var unselectNode = function(node){
		node.setContent($(node.content).removeClass('selected')[0].outerHTML);
		return node;
	}
	
	
	return {
		init: initToolbar
	}
	
});
