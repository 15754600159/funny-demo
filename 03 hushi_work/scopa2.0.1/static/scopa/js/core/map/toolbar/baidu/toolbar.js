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
		baidu: {
			drawing: ['baidu/DrawingManager_min', 'baidu/DrawingManager_min.css'],//['http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js', 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css'],
			geoutils: 'baidu/GeoUtils_min'//'http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js'
		},
		circle: mining.baseurl.core + '/map/searchCircle', //vertexGeo: JSON.stringify({lat,lng,radius}),labels
		buffer: mining.baseurl.core + '/map/searchBuffer'  //vertexGeo: JSON.stringify({bufferRadius, points:[{lat, lng}]}),labels
	},
	showModule = require('core/common/showelement'),
	mapModule,
    eventModule,
    $toolbar,
    map,
    drawingManager,
    overlayEvent;
    
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
		
		/* 鼠标绘制 */
		//加载鼠标绘制工具
		require.async(requestUrl.baidu.drawing, function(){
		    var styleOptions = {
		        strokeColor:"#2d9bf6",    //边线颜色。
		        fillColor:"#3e89fa",      //填充颜色。当参数为空时，圆形将没有填充效果。
		        strokeWeight: 2,       //边线的宽度，以像素为单位。
		        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
		        fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
		        strokeStyle: 'dashed' //边线的样式，solid或dashed。
		    }
		    //实例化鼠标绘制工具
		    drawingManager = new BMapLib.DrawingManager(map, {
		        isOpen: false, //是否开启绘制模式
		        enableDrawingTool: false, //是否显示工具栏
		        circleOptions: styleOptions, //圆的样式
		        polylineOptions: styleOptions, //线的样式
		        //polygonOptions: styleOptions, //多边形的样式
		        rectangleOptions: styleOptions //矩形的样式
		    });  
			//添加鼠标绘制工具监听事件，用于获取绘制结果
			drawingManager.addEventListener('circlecomplete', scopasearchcomplete);
			drawingManager.addEventListener('polylinecomplete', scopasearchcomplete);
			drawingManager.addEventListener('rectanglecomplete', scoparectanglecomplete);
		});
			
			
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
			drawingManager.open();
			drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
			mining.utils.serverLog(58);//用户行为记录
		});
		
		//路径搜索
		$('.pathsearch',$toolbar).off('click').on('click', function(e){
			closeOverlay();
			$(this).addClass('active');
			drawingManager.open();
			drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);
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
			/*var elements = {nodes:[], edges:[]},nameArr = [];
    		
    		$.each(dmap.$(':selected'), function(i,m){
    			var n = m.data().data, _name = getShowName(n);
    			
    			nameArr.push(_name);
				elements.nodes.push({
					data: {
						id: String(n.gid), 
						name: _name, 
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
    		}
    		mining.utils.serverLog(60,nameArr.join('；'));//用户行为记录*/
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
	    		snapshotData,
	    		nameArr = [];
    		
	    	$.each(map.$(':selected'), function(i,n){
				transferDataArr.push(n.data().data);
				nameArr.push(getShowName(n.data().data));
			});
			snapshotData = mining.utils.localStorage(snapshotName);
			if(!snapshotData.filelist) snapshotData.filelist = [];
			$.each(transferDataArr, function(i,n){
				snapshotData.filelist.pushOnly(n);
			});
			mining.utils.localStorage(snapshotName, snapshotData);
			mining.utils.hashChange('file');
			mining.utils.serverLog(61,nameArr.join('；'));//用户行为记录*/
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
				drawingManager.close();
			}else{
				$(this).addClass('active');
				drawingManager.open();
				drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
			}
			mining.utils.serverLog(63);//用户行为记录
		});
		
		//保存快照
		$('.save-snapshot',$toolbar).off('click').on('click', function(){
			var imgSrc = 'http://api.map.baidu.com/staticimage?',
				params = {
					width: 1024,
					height: dmap.height,
					center: dmap.getCenter().lng + ',' + dmap.getCenter().lat,
					zoom: dmap.getZoom(),
					markers: '',
					markerStyles: ''
				}, 
				markersArr = [],
				markerStylesArr = [],
				paramArr = [];
			
			$.each(dmap.nodes(), function(i,n){
				markersArr.push(n.point.lng + ',' + n.point.lat);
				markerStylesArr.push('-1,http://k1222.mzhen.cn/static/scopa/theme/default/images/map/position-entity.png');
			});
			params.markers = markersArr.join('|');
			params.markerStyles = markerStylesArr.join('|');
			$.each(params, function(i,n){
				paramArr.push(i + '=' + n);
			});
            $dialog({
                title: '地图快照',
                width: params.width,
                height: params.height,
                content: '<img src="' + encodeURI(imgSrc + paramArr.join('&')) + '">'
            }).showModal();
                
                
                
			/*require('html2canvas');
			html2canvas($('#mapGraph)[0], {
	            onrendered: function(canvas) {
	                $dialog({
	                	title: '地图快照',
	                	content: canvas
	                }).showModal();
	            }
	        });*/
		});
		
		//清空图析
		$('.clearall',$toolbar).off('click').on('click', function(){
			closeOverlay();
			mapModule.clear();
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
			}else if(e.keyCode == mining.keyCode.DELETE && $.hash().indexOf('map') != -1){
				mapModule.delelements(':selected');
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
	}
	
	var closeOverlay = function(){
		var $dlg = $dialog.getCurrent();
		
		if($dlg)$dlg.close().remove();
		if(overlayEvent)overlayEvent.remove();
		if(bufferOverlay)bufferOverlay.remove();
		$('.circlesearch,.pathsearch,.select-multi',$toolbar).removeClass('active');
	}
	
	/* 半径搜索 + 路径搜素 */
	window.scopasearchcomplete = function(evt){
		drawingManager.close();
		overlayEvent = evt;
		window.overlayEvent = evt;
		var title = '半径搜索', 
			$path = $('#mapGraph svg path'),
			overlay = evt;
			
		if(drawingManager.getDrawingMode() != 'circle'){
			title = '路径搜索';
			overlay = bufferLine(evt);
		}
		require('validate');
		$dialog({
			id: 'overlaycompleteDialog',
    		title: title,
    		width: 300,
    		align: 'left top',
    		onshow: function(){
    			var $dlg = this, $node = $(this.node);
    			
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
					    	  	/*'<div class="form-group">',
					    	    	'<label class="col-sm-3 control-label">对象</label>',
					    	    	'<div class="col-sm-8">',
					    	    		'<input type="text" name="type" class="required" placeholder="请选择..." style="width:190px;">',
					    	    	'</div>',
					    	  	'</div>',*/
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
				
				var radius = Math.round(overlay.getRadius()), 
					minradius = 1, 
					maxradius = radius * 2, 
					radiusChanged = true;
				
				overlay.setRadius(radius);
				$('.radius',$node).slider({
				 	range: 'min',
			      	value: radius,
			      	min: minradius,
			      	max: maxradius,
			      	slide: function( event, ui ) {
			      		overlay.setRadius(ui.value);
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
					overlay.setRadius(radius);
					$('[name=radius]',$node).val(radius);
					radiusChanged = true;
				}
				$('[name=radius]',$node).on('change', changeRadius).val(radius);
				
				/*var objList = mining.mappingutils.getTypeList(), typeData = {};
				$.each(objList, function(i,n){
					var type = mining.mappingutils.getType(i);
					if(!typeData[type])typeData[type] = [];
					typeData[type].push({
						text: n,
						id: i
					});
				});
				$('[name=type]',$node).select2({
				    data:[
				    	{id:'entity',text:'实体'},
				    	{id:'event',text:'事件'}
			    	],
			    	dropdownCssClass: 'artui-select2'
				}).on('change', function(){
					$('[name=label]',$node).select2({
						data: typeData[$(this).val()],
						dropdownCssClass: 'artui-select2'
					}).select2('val', typeData[$(this).val()][0].id);
				}).on('select2-open', function(){
					$(this).siblings('label.error').remove();
				});
				$('[name=label]',$node).select2({
					data:[],
			    	dropdownCssClass: 'artui-select2'
		    	}).on('select2-open', function(){
					$(this).siblings('label.error').remove();
				});*/
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
    			if(drawingManager.getDrawingMode() == 'circle'){
    				url = requestUrl.circle;
    				data = {
						vertexGeo: JSON.stringify({
							lat: parseFloat(overlay.point.lat),
							lng: parseFloat(overlay.point.lng),
							radius: radius / 1000
						}),
						labels: labels,
						keyword: keyword
					}
    			}else{
    				url = requestUrl.buffer;
    				data = {
						vertexGeos: JSON.stringify({
							points: evt.getPath(),
							bufferRadius: radius / 1000
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
						mapModule.appenddata(data.v);
					},
    				error: function(data){
    					$dialog.alertMsg(data, '创建快照失败，请稍后重试！', 'error');
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
	
	var scale = [2000000, 1000000, 500000, 200000, 100000, 50000, 25000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20];
	var bufferOverlay = null;
	var bufferLine = function(evt){
		this.polyline = new BMap.Polyline(evt.getPath(), {strokeColor:"blue", strokeWeight:20, strokeOpacity:0.2});
		map.addOverlay(polyline);
		bufferOverlay = polyline;
		this.getRadius = function(){
			return scale[map.getZoom()-3] * this.polyline.getStrokeWeight() / 100;
		}
		this.setRadius = function(buffer){
			this.polyline.setStrokeWeight(buffer / scale[map.getZoom()-3]* 100);
		}
		return this;
	}
	
	/* 选择多个 */
	var scoparectangletimer;
	window.scoparectanglestate = false;
	window.scoparectanglecomplete = function(evt){
		window.scoparectanglestate = true;
		var bds = evt.getBounds(),
			allOverlay = map.getOverlays(),
			selectedArr = [];
		
		overlayEvent = evt;
		overlayEvent.remove();
		require.async(requestUrl.baidu.geoutils, function(){
			$.each(map.elements(), function(i,n){
				if(BMapLib.GeoUtils.isPointInRect(n.point, bds)){
					n.select();
				}else{
					n.unselect();
				}
			});
			try{clearTimeout(scoparectangletimer)}catch(e){}
			scoparectangletimer = setTimeout(function(){
				window.scoparectanglestate = false;
			},300);
		});
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
