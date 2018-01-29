define(function(require, exports, module){
	
	module.exports = function(){
		//http://api.map.baidu.com/api?v=2.0&ak=dcqtCFS46bTtSDPBGvlnlTbG
		window.wise=0;window.netSpeed=0;window.netType=0; window.BMap_loadScriptTime = (new Date).getTime();
		var requestUrl = {
			baidu: {
				//getscript: 'baidu/main'
				//getscript: mining.baseurl.host + ':8080/miningmap/resources/default/js/apiv2.0.1021.min.js'
				getscript: 'http://10.25.1.234:80/PGIS_S_TileMap/js/EzMapAPI.js'
			},
			getEventsGeo: mining.baseurl.core + '/archive/getEventsGeoData',//参数:ids JSONArray
		}
		//require('jqueryui');
		seajs.importStyle('body .title{ text-align:left;}');
		var mapConfig = {
			id: '',
			zoom: 1,
			minZoom: 0.1,
			maxZoom: 6,
			animate: 300,
			snapshot: true,	//是否检测快照
			readyCallback: null,
			selectCallback: null,
			resizeCallback: null,
			dblclickCallback: null,
			dataCallback: null
		},
		map,
		datatimer, 
		selecttimer = -1, 
		interval = 50;
		
		var initMap = function(config){
			var op = $.extend(mapConfig, config),
				$container = $('#' + op.id);
			
			if(mining.utils.isEmpty(op.id)) return;
			if($container.size() < 1) return ;
		    if(config.hasOwnProperty('map')){map=null}
	        if(!mining.utils.isEmpty(map)) return map;
			//初始化地图
			//$container.css('opacity', 0.9);
			require.async('../../../graph/graphmenu/contextmenu', function(){
				$container.contextMenu('mapmenu',{
					onShowMenu: function(){
						return '';
					}
				});
			});
			//1） ********构造地图控件对象，用于装载地图
			if(typeof EzMap == 'undefined')return;
			  map = new EzMap(document.getElementById(op.id));
		
			  //2）********初始化地图，并显示地图
			  map.initialize();
			  
			  //3）********以下为其它一些附属功能
			  // 显示左侧导航工具条
			  map.showMapControl();
			  
			  MainFrame.prototype.onClick = function(b) {
				if (_browserType != "Firefox") {
					$(document).focus()
				}
				EzEvent.ezEventListener.source = this;
				EzEvent.ezEventListener.eventType = EzEvent.MAP_CLICK;
				EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
			};
			  
			  map.addMapEventListener(EzEvent.MAP_CLICK, function(e){
			  	if(window.event.ctrlKey || window.scoparectanglestate) return;
			    $.each(map.elements(':selected'), function(i,n){
					n.unselect();
				}); 
			  });
			map.addMapEventListener(EzEvent.MAP_DBLCLICK, function(e){
			    if(mapConfig.dblclickCallback)mapConfig.dblclickCallback.call();
			});
			  
		  	configurableMap();
		  	map.changeDragMode("pan");
		  	window.dmap = map;
		  	
		  	if(config.readyCallback)config.readyCallback(map);
			if(op.snapshot)initSnapshot(true);
			
			try{
				$('.noprint').each(function(i,n){
					if(i > 3 && i < 10){
						$(this).height(22);
					}
				});
			}catch(e){}
			
			
			return map;
		}
		
		var configurableMap = function(){
			map.$ = function(selector){
				var allOverlay = map.getOverlays(),
					elementArr = [];
				
				$.each(allOverlay, function(i,n){
					if((n.hasClass && n.hasClass(selector)) || (selector.indexOf('#') == 0 && $.isFunction(n.data) && n.data().id == parseInt(selector.replace('#', '')))){
						elementArr.push(n);
					}
				});
				return elementArr;
			}
			map.elements = function(selector){
				return map.nodes(selector).concat(map.edges(selector));
			}
			map.nodes = function(selector){
				selector = selector || '';
				return map.$('.entity' + selector + ',.event' + selector + '');
			}
			map.edges = function(selector){
				selector = selector || '';
				return map.$('.relation' + selector);
			}
			map.resize = function(){
				if($('.page-map .infoside .scalebtn-full').is(':hidden')){
					$('.page-map .toolbar .rightbar').animate({'margin-right': '80px'}, 300);
					//map.navigationControl.setOffset(new BMap.Size(0, 145));
				}else{
					$('.page-map .toolbar .rightbar').animate({'margin-right': '0'}, 300);
					//map.navigationControl.setOffset(new BMap.Size(0, 65));
				}
				if(mapConfig.resizeCallback)mapConfig.resizeCallback.call();
			}
		}
		
	    var getMapIcon = function(data){
	    	return '<div class="mapicon ' + data.etype + '"><span class="item" style="background-image:url(' + mining.mappingutils.getMapIcon(data) + ');"></span><span class="mark"></span></div>';
	    }
	    var getClasses = function(data){
			return (data.etype + ' ' + data.label + ' ' + mining.mappingutils.getName(data) + ' ' + (data.class ? data.class : '')).split(' ');
		}   
		
		/* 添加数据 */
		var appendData = function(data, selected, history){
			if(mining.utils.isEmpty(data))return;
			selected = mining.utils.isEmpty(selected) ? true : selected;
			
			var pointArr = [], eventArr = [], eventKeyData = {};
			$.each(data, function(i,n){
				if(mining.mappingutils.getType(n) == 'event'){
					eventArr.push(n.gid);
					if(n.key_label_2){
						if(!eventKeyData[n.key_label_2])eventKeyData[n.key_label_2] = [];
						eventKeyData[n.key_label_2].push(n);
					}
				}
			});
			
			if(eventArr.length > 0){
				$ajax.ajax({
				    url: requestUrl.getEventsGeo,
				    type: "POST",
				    data: {
						ids: JSON.stringify(eventArr)
					},
					success: function(geos){
						if(!geos.v)return;
						$.each(geos.v, function(i,n){
							if(eventKeyData[n.key]){
								n.eventlist = eventKeyData[n.key];
								try{
									var timeArr = [];
									$.each(n.eventlist, function(j,m){
										timeArr = timeArr.concat(mining.mappingutils.getTimeList(m)[0].time);
									});
									n.specialtime = timeArr.join(',')
								}catch(e){}
							}
						});
						data = data.concat(geos.v);
						addData(data, selected, history);
					},
					error: function(geos){
						
					}
				});
				return;
			}
			addData(data, selected, history);
		}
		
		var addData = function(data, selected, history){
			var idArr = [], uPoint;
			
			$.each(data, function(i,n){
				if(!n.geo || typeof n.geo != 'object') return;
				idArr.push('#' + n.gid);
				if(map.$('#' + n.gid).length > 0)return;
				n.etype = mining.mappingutils.getType(n);
				
				//用HTMLElementOver来模拟Marker对象
			  uPoint = new Point(n.geo.lng, n.geo.lat);
			  var uHTMLOverLay1 = new HTMLElementOverLay("marker1",uPoint,getMapIcon(n));
			  
			  configurableNode(uHTMLOverLay1, n);
			  
			  map.addOverlay(uHTMLOverLay1);//uEzMap为EzMap类实例
			});
			if(selected){
				$.each(idArr, function(i,n){
					map.$(n)[0].select();
				});
			}
			if(uPoint)map.centerAtLatLng(uPoint);
			refreshMap();
			if(mapConfig.snapshot && !history)mining.utils.saveMapHistory(map);
		}
		
		
		var configurableNode = function(label, data){
			label.selected = false;
			label.select = function(){
				$('.mapicon',label.div).addClass('selected');
				label.selected = true;
				
				selecttimer = setTimeout(function() {
					clearTimeout(selecttimer);
					refreshSelection();
				}, interval);
				
				return label;
			};
			label.unselect = function(){
				$('.mapicon',label.div).removeClass('selected');
				label.selected = false;
				
				selecttimer = setTimeout(function() {
					clearTimeout(selecttimer);
					refreshSelection();
				}, interval);
						
				return label;
			}
			label.data = function(){
				return {
					id: data.gid,
					data: data,
					etype: data.etype
				}
			}
			label.class = getClasses(data);
			label.addClass = function(classname){
				//label.setContent($(label.content).addClass(classname)[0].outerHTML);
				$('.mapicon',label.div).addClass(classname);
				label.class.pushOnly(classname);
				
				return label;
			}
			label.removeClass = function(classname){
				//label.setContent($(label.content).removeClass(classname)[0].outerHTML);
				$('.mapicon',label.div).removeClass(classname);
				label.class.remove(classname);
				
				return label;
			}
			label.hasClass = function(selector){
				var selectorArr = selector = selector.split(',') || [],
					has = false;
				
				if(mining.utils.isEmpty(selectorArr)){
					has = true;
				}else{
					$.each(selectorArr, function(i,n){
						var classname = n.replace('node.','').replace('edge.','').replace('.','');
						if(
							$('.mapicon',label.div).attr('class').split(' ').indexOf(classname) != -1 ||
							label.class.indexOf(classname) != -1 || 
							(n.indexOf(':selected') != -1 && label.selected && label.class.indexOf(n.replace(':selected','').replace('node.','').replace('edge.','').replace('.','') != -1)) || 
							(n.indexOf('nofilter') != -1 && label.class.indexOf('nofilter') != -1 && label.class.indexOf(n.replace('.nofilter','').replace('node.','').replace('edge.','').replace('.','') != -1))
						){
							has = true;
							return false;
						}
					})
				}
				
				return has;
			}
			
			//label.addEventListener('click', function(e){
			$('.mapicon',label.div).on('click', function(e){
				if(!e.ctrlKey){
					$.each(map.elements(), function(i,n){
						n.unselect();
					});
				}
				label.select();
				mining.utils.stopBubble(e);
			});
		}
		
		/* 初始化快照 */
		var initSnapshot = function(fromhistory){
			fromhistory = fromhistory || false;
			
			var snapshot = mining.utils.localStorage(mining.localname.mapSnapshot);
			
			if(!snapshot){
				if(fromhistory)mining.utils.openMapHistory({appenddata: appendData}, 'final', refreshMap);
				return;
			}
			mining.utils.localStorage(mining.localname.mapSnapshot, null);
			mining.utils.openMapSnapshot({appenddata: appendData}, snapshot);
			//保存历史记录
			setTimeout(function(){
				//mining.utils.saveMapHistory(map);
			}, 300);
			refreshMap();
		}
		
		var refreshMap = function(type){
			if(type == 'select'){
				if(mapConfig.selectCallback)mapConfig.selectCallback.call();
				return;
			}
			clearTimeout(datatimer);
			datatimer = setTimeout(function() {
				if(mapConfig.dataCallback)mapConfig.dataCallback.call();
			}, interval);
		}
		
		var refreshSelection = function(){
			if(scopa_infosideaction)return;
			if(mapConfig.selectCallback)mapConfig.selectCallback.call();
		}
		
		/* 删除元素 */
		var deleteElements = function(selector){
			selector = selector || 'all';	//all | :selected | :unselected ...
			if(selector == 'all'){
				clearMap();
			}else{
				var delArr = [], mapSnapshot = mining.utils.getMapSnapshot(map);
				$.each(map.elements(selector), function(i,n){
					delArr.push(n.data().data);
					map.removeOverlay(n);
				});
				$.each(delArr, function(i,n){
					mapSnapshot.remove(n);
				});
				refreshMap();
				mining.utils.localStorage(mining.localname.mapSnapshot, mapSnapshot);
			}
			mining.utils.saveMapHistory(map);
		}
		
		/* 时间筛选 */
		var timeFilter = function(range, labels){
			$.each(map.$('node.entity'), function(i,n){
	  			var data = n.data().data,
	  				timeList = mining.mappingutils.getTimeList(data);
		  			
	  			$.each(timeList, function(j,m){
	  				$.each(m.time, function(k,o){
		  				var d = new Date(parseInt(o));
		  				
		  				if(labels.indexOf(m.label) != -1 && range[0] <= d && d <= range[1]){
			  				$('.mapicon',n.div).removeClass('nofilter');
			  				return false;
			  			}else{
			  				$('.mapicon',n.div).addClass('nofilter');
			  			}
		  			});
	  			});
	  		});
		}
			
		/* 类别筛选 */
		var labelFilter = function(labels){
			$.each(map.$('node.entity'), function(i,n){
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
		}
		
		/* 清空地图 */
		var clearMap = function(){
			mining.utils.localStorage(mining.localname.mapSnapshot, null);
			map.clearOverlays();
			refreshMap();
		}
		
		
		
		
		return {
			init: initMap,
			refresh: refreshMap,
			appenddata: appendData,
			snapshot: initSnapshot,
			delelements: deleteElements,
			timefilter: timeFilter,
			labelfilter: labelFilter,
			clear: clearMap
		}
	}
});
