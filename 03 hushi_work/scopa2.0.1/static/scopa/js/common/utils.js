define(function(require, exports, module){
	
	$.extend(mining.utils, {
        /**
         * @name Utils#hasRoleForButton
         * @function
         * @desc 是否有权限。
         * @example
         */
        hasRoleForAction:function(button){
			var roleData=mining.userinfo.authority;
            if (roleData) {
                var role = mining.roleRelation[button];
                if (roleData.indexOf(role)>-1)
                    return true;
            }
            return false;
		},
        /**
         * @name Utils#getUserInfo
	     * @function   
	     * @desc 获取用户信息。
	     * @example
	     */     
        getUserInfo:function(callback){
            var userModule = require('common/user'),
            	loginsuccess = function(data){
            		try{
            			$('.navbar .userinfo').html(data.name).attr('title',data.name);
						mining.userinfo = data;
						if(callback)callback.call();
            		}catch(e){}
            	}
            
            userModule.get({
            	success: loginsuccess,
            	error: function(data){
            		mining.utils.loadLogin({
            			message: '获取用户信息失败，请重新登陆',
            			success: loginsuccess
            		});
            	}
            });
        },
        /**
		 * @name Utils#loadPage
	     * @function   
	     * @desc 装载页面模板。
	     * @param {Object} $page	【必选】
	     * @param {Function} callback
	     */
        loadPage: function($page, callback){
        	if($page.hasClass('pageloaded') && callback){
       			callback.call();
       			return;
       		}
        	
        	var nav = $page.attr('template');
        	if(mining.utils.isEmpty($page)){
        		nav = '/core/home'
        	}
        	if(mining.utils.isEmpty(nav))return;
        	var navname = nav.replaceAll('/','_'),
       			pageurl = staticUrl + '/scopa/template/' + nav + '.html',
       			localTemplate = mining.utils.localStorage(mining.localname.template) || {},
       			page = localTemplate[navname];
       			
       		//if(mining.utils.isEmpty(page)){
       			$ajax.ajax({
					url: pageurl,
					async: false,
					success: function(data){
						page = data;
						mining.utils.localStorage(mining.localname.template, $.extend(localTemplate, mining.utils.newObj(navname, page)));
					}
				});
       		//}
			$page.html(page);
			$page.addClass('pageloaded');
			if(callback)callback.call();
        },
		/**
		 * @name Utils#alertMsg
	     * @function   
	     * @desc 弹出提示框。
	     * @param {Object} data
	     * @param {String} msg
	     * @param {String} type
	     */
		alertMsg: function(data, msg, type){
			var _msg = _type = '';
			
			if(typeof data == 'string' && typeof type == 'undefined'){
				 _msg = data;
				 _type = msg;
			}else{
				_msg = (!mining.utils.isEmpty(msg)?msg:'');
				_type = type;
				if(!mining.utils.isEmpty(data) && !mining.utils.isEmpty(data.message))_msg += ('：<b>'+data.message+'</b>');
			}
			$dialog.alert(_msg, type);
		},
		/**
		 * @name Utils#hashChange
	     * @function   
	     * @desc 模块间跳转。
	     * @param {String} name
	     * @param {String} parent
	     */
		hashChange: function(name, parent){
			var _name = name || 'home',
				_parent = parent || 'scopa',
				_hash = '#!' + _parent + '/' + _name;
				
			mining.utils.gotoUrl(location.hash?location.href.replace(location.hash, _hash) : location.href + _hash);
		},
		/**
		 * @name Utils#getGraphSnapshot
	     * @function   
	     * @desc 获取当前图析快照。
	     * @param {Object} graph
	     * @param {Object} thumbconfig
	     * @return {Object} {graph, thumbnail}
	     */
       	getGraphSnapshot: function(graph, thumbconfig){
       		thumbconfig = thumbconfig || {
				maxWidth: 240,
				maxHeight: 160,
				full: true
			}
       		
       		var json = graph.json();
			var snapshotJson = {
				elements: json.elements,
				zoom: json.zoom,
				pan: json.pan
			};
			try{
				var snapshotThumb = graph.png(thumbconfig);
			}catch(e){
				var snapshotThumb = '';
			}
			
			//selected.select();
			
       		return {
       			graph: snapshotJson,
       			thumbnail: snapshotThumb
       		}
        },
		/**
		 * @name Utils#formatSnapshotData
	     * @function   
	     * @desc 格式化快照数据。
	     * @param {Object} snapshot
	     * @param {Object} snapshot
	     */
        formatSnapshotData: function(snapshot){
        	if(mining.utils.isEmpty(snapshot))return null;
       		snapshot = typeof snapshot == 'string' ? JSON.parse(snapshot) : snapshot;
       		if((typeof snapshot.elements == 'undefined' || mining.utils.isEmpty(snapshot.elements)) && (typeof snapshot.data == 'undefined' || mining.utils.isEmpty(snapshot.data)))return null;
        	var _snapshotTemp = snapshot;
        	if(_snapshotTemp.data){
       			_snapshotTemp = {
       				elements: {nodes:[], edges:[]},
       				zoom: snapshot.params.zoom,
       				pan: snapshot.params.pan
       			};
       			if(snapshot.data.v){
       				$.each(snapshot.data.v, function(i,n){
       					_snapshotTemp.elements.nodes.push(graphModule.getnodedata(n, snapshot.params.position[n.gid], true));
       				});
       			}
       			if(snapshot.data.e){
       				$.each(snapshot.data.e, function(i,n){
       					_snapshotTemp.elements.edges.push(graphModule.getedgedata(n, true));
       				});
       			}
       		}
        	
        	return _snapshotTemp;
        },
		/**
		 * @name Utils#openGraphSnapshot
	     * @function   
	     * @desc 获取当前图析快照。
	     * @param {Object} graph
	     * @param {Object} snapshot
	     * @param {String} type['open' | 'import']
	     */
       	openGraphSnapshot: function(graph, snapshot, type){
       		snapshot = mining.utils.formatSnapshotData(snapshot);
       		if(mining.utils.isEmpty(snapshot))return;
       		console.time('openGraphSnapshot')
       		type = type || 'open';	//open | import
       		graph.$(':selected').unselect();
			if(type == 'open'){
				graph.elements().remove();
				graph.animate({
					zoom: snapshot.zoom,
					pan: snapshot.pan
				},{
					duration: 300
				});
			}
			try{
				if(window.graphNotesMoudle){
					var nodeIdArr = [];
					$.each(snapshot.elements.nodes, function(i,n){
						nodeIdArr.push(n.data.data.gid);
					});
					window.graphNotesMoudle.isNoted({
						dataIds: nodeIdArr,
						async: false,
						callback: function(result){
							notedArr = result.listObj;
						}
					});
					$.each(snapshot.elements.nodes, function(i,n){
						var data = n.data.data;
						data.noted = notedArr.indexOf(data.gid.toString()) != -1 ? true : false;
					});
				}
			}catch(e){}
			graph.add(mining.utils.openEventChart(snapshot.elements));
			try{graphModule.adjustzoom();}catch(e){}
			if(snapshot.data)return;
			try{
				graph.$(':selected').unselect();
				window.scopa_infosideaction = true;
				var _arr = [];
				if(snapshot.elements.nodes){
					$.each(snapshot.elements.nodes, function(i,n){
						_arr.push('#' + n.data.id);
					});
				}
				graph.edges(':selected').unselect();
				if(snapshot.elements.edges){
					$.each(snapshot.elements.edges, function(i,n){
						_arr.push('#' + n.data.id);
						
					});
				}
				graph.$(_arr.join(',')).select();
				setTimeout(function(){
					window.scopa_infosideaction = false;
				},300);
				console.timeEnd('openGraphSnapshot')
			}catch(e){}
        },
		/**
		 * @name Utils#saveGraphHistory
	     * @function   
	     * @desc 保存图析历史记录。
	     * @param {Object} graph
	     * @param {Function} callback
	     */
       	saveGraphHistory: function(graph, callback){
       		if(window.SCOPA_openGraphFromHistory || !$('.page-graph .breadnav-graph').hasClass('active')){
       			window.SCOPA_openGraphFromHistory = false;
       			return;
       		}
       		try{clearTimeout(SCOPATIMER_saveGraphHistory);}catch(e){};
			SCOPATIMER_saveGraphHistory = setTimeout(function(){
	       		if(graph.elements().length > mining.graphMaxMnu) return;
	       		var historyLen = mining.history,	//记录步数
	       			graphHistory = mining.utils.localStorage(mining.localname.graphHistory) || {current:0, list:[]};
	       		
	       		while(graphHistory.list.length > historyLen - 1){
	       			graphHistory.list.shift();
	       		}
	       		graphHistory.list.push(mining.utils.getGraphSnapshot(graph).graph);
	       		graphHistory.current = graphHistory.list.length - 1;
	       		mining.utils.localStorage(mining.localname.graphHistory, graphHistory);
	       		if(callback)callback.call();
	       		seajs.log('保存图析历史记录成功！');
       		}, 1000);
        },
		/**
		 * @name Utils#openGraphHistory
	     * @function   
	     * @desc 打开图析历史记录。
	     * @param {Object} graph
	     * @param {String} type[forward | backward | final]
	     */
       	openGraphHistory: function(graph, type, callback){
       		var graphHistory = mining.utils.localStorage(mining.localname.graphHistory) || {},
       			snapshot = null;
       		
       		if(!mining.utils.isEmpty(graphHistory)){
       			if(type == 'forward' && graphHistory.current < graphHistory.list.length - 1){
	       			snapshot = graphHistory.list[++graphHistory.current];
	       		}else if(type == 'backward' && graphHistory.current > 0){
	       			snapshot = graphHistory.list[--graphHistory.current];
	       		}else if(type == 'final'){
	       			snapshot = graphHistory.list[graphHistory.current];
	       		}
	       		if(snapshot == null) return;
	       		window.SCOPA_openGraphFromHistory = true;
	       		mining.utils.openGraphSnapshot(graph, snapshot);
	       		mining.utils.localStorage(mining.localname.graphHistory, graphHistory);
       		}
       		if(callback)callback.call();
        },
		/**
		 * @name Utils#getMapSnapshot
	     * @function   
	     * @desc 获取当前地图快照。
	     * @param {Object} map
	     * @return {Object} snapshot
	     */
       	getMapSnapshot: function(map){
       		var snapshotJson = [],
       			snapshotThumb = '';
       			
			$.each(map.elements(), function(i,n){
				snapshotJson.push(n.data().data);
			});
			
       		return snapshotJson
        },
		/**
		 * @name Utils#openMapSnapshot
	     * @function   
	     * @desc 获取当前地图快照。
	     * @param {Object} map
	     * @param {Object} snapshot
	     * @param {Boolean} history
	     */
       	openMapSnapshot: function(map, snapshot, history){
       		try{map.clear();}catch(e){}
       		if(!mining.utils.isEmpty(snapshot)){
	       		map.appenddata(snapshot, true, history);
       		}
        },
		/**
		 * @name Utils#saveMapHistory
	     * @function   
	     * @desc 保存地图历史记录。
	     * @param {Object} map
	     */
       	saveMapHistory: function(map){
       		if(window.SCOPA_openMapFromHistory){
       			window.SCOPA_openMapFromHistory = false;
       			return;
       		}
       		var historyLen = mining.history,	//记录步数
       			mapHistory = mining.utils.localStorage(mining.localname.mapHistory) || {current:0, list:[]};
       		
       		while(mapHistory.list.length > historyLen - 1){
       			mapHistory.list.shift();
       		}
       		mapHistory.list.push(mining.utils.getMapSnapshot(map));
       		mapHistory.current = mapHistory.list.length - 1;
       		mining.utils.localStorage(mining.localname.mapHistory, mapHistory);
       		seajs.log('保存地图历史记录成功！');
        },
		/**
		 * @name Utils#openMapHistory
	     * @function   
	     * @desc 打开图析历史记录。
	     * @param {Object} map
	     * @param {String} type[forward | backward | final]
	     */
       	openMapHistory: function(map, type, callback){
       		var mapHistory = mining.utils.localStorage(mining.localname.mapHistory) || {},
       			snapshot = null;
       		
       		if(!mining.utils.isEmpty(mapHistory)){
       			if(type == 'forward' && mapHistory.current < mapHistory.list.length - 1){
	       			snapshot = mapHistory.list[++mapHistory.current];
	       		}else if(type == 'backward' && mapHistory.current > 0){
	       			snapshot = mapHistory.list[--mapHistory.current];
	       		}else if(type == 'final'){
	       			snapshot = mapHistory.list[mapHistory.current];
	       		}
	       		if(snapshot == null) return;
	       		window.SCOPA_openMapFromHistory = true;
	       		mining.utils.openMapSnapshot(map, snapshot, true);
	       		mining.utils.localStorage(mining.localname.mapHistory, mapHistory);
       		}
       		if(callback)callback.call();
        },
        /**
		 * @name Utils#saveFileHistory
	     * @function   
	     * @desc 保存档案历史记录。
	     * @param {Object} null
	     */
       	saveFileHistory: function(){
       		try{clearTimeout(SCOPATIMER_saveFileHistory);}catch(e){};
			SCOPATIMER_saveFileHistory = setTimeout(function(){
	       		var historyLen = mining.history,	//记录步数
	       			fileHistory = mining.utils.localStorage(mining.localname.fileHistory) || {current:0, list:[]},
	       			fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot) || {};

	       		
	       		while(fileHistory.list.length > historyLen - 1){
	       			fileHistory.list.shift();
	       		}
	       		if((fileHistory.current + 1) < fileHistory.list.length){
	       			var startIndex = parseInt(fileHistory.current + 1),
	       				itemCount = parseInt(fileHistory.list.length - startIndex);
	       			fileHistory.list.splice(startIndex,itemCount);
	       		}

	       		fileHistory.list.push(fileSnapshot);
	       		fileHistory.current = fileHistory.list.length - 1;
	       		mining.utils.localStorage(mining.localname.fileHistory, fileHistory);
	       		seajs.log('保存档案历史记录成功！');
       		}, 1000);
        },
		/**
		 * @name Utils#frmatEventData
	     * @function   
	     * @desc 格式化 event 数据格式。
	     * @param {Object} entity
	     * @param {Object} events
	     * @return {Object} data
	     */
        frmatEventData: function(entity, events){
       		var dataArr = {v: mining.utils.clone(events), e:[]};
       		
       		$.each(dataArr.v, function(i,n){
       			n.gid = n.id.replaceAll('	','');
				n.etype = 'event';
				
				dataArr.e.push({
					gid: (entity.gid+n.gid).replaceAll('	',''),
					from: entity.gid,
					to: n.gid,
					label: n.label,
					etype: 'event'
				});
       		});
       		return dataArr;
        },
		/**
		 * @name Utils#frmatMergeData
	     * @function   
	     * @desc 格式化 event 数据格式。
	     * @param {Object} entity
	     * @param {Object} events
	     * @return {Object} data
	     */
        frmatMergeData: function(data){
        	
        	$.each(data.e, function(i,n){
        		n.class = 'link';
        		n.type = 'other';
        		n.etype = 'event';
        	})
        	
        	return {v:data.v, e:data.e};
        	var dataArr = {v:[], e:[]}, entitymap = {}, eventmap = {};
        	
        	$.each(data.v, function(i,n){
        		if(mining.mappingutils.getType(n) != 'event'){
        			dataArr.v.push(n);
        			entitymap[n.gid] = n;
        		}else{
        			eventmap[n.gid] = n;
        		}
			});
			
			var getnewId = function(eventid){
				var newid = '';
				$.each(data.e, function(i,n){
					if(eventmap[n.from] && entitymap[n.to]){
						newid = n.to;
						return false;
					}else if(eventmap[n.to] && entitymap[n.from]){
						newid = n.from;
						return false;
					}
				});
				return newid;
			}
			$.each(data.e, function(i,n){
				var find = false;
				
				n.etype = 'event';
				if(eventmap[n.from] && !entitymap[n.to]){
					n.from = getnewId(n.from);
					find = true;
				}else if(eventmap[n.to] && !entitymap[n.from]){
					n.to = getnewId(n.to);
					find = true;
				}
				if(find){
					var has = false;
					$.each(dataArr.e, function(j,m){
						if((m.from == n.from && m.to == n.to) || (m.to == n.from && m.from == m.to)){
							has = true;
							return false;
						}
					})
					if(!has)dataArr.e.push(n);
				}
			})
			
			
       		
       		return dataArr;
        },
		/**
		 * @name Utils#frmatHartsMerge
	     * @function   
	     * @desc 格式化 harts merge 数据格式。
	     * @param {Object} mergedata
	     * @return {Object} tabledata
	     */
        formatHartsMerge: function(mergedata){
        	var eventArr = [],
        		eventPoopArr = {},
        		tableData = {};
        	
        	var changePro = function(proname){
    			return proname.replace('eHOTEL','ePASSPORTHOTEL').replace('eTRAIN','ePASSPORTTRAIN').replace('eFLIGHTlg','ePASSPORTFLIGHTlg');
        	}
        	var unchangePro = function(proname){
    			return proname.replace('ePASSPORTHOTEL','eHOTEL').replace('ePASSPORTTRAIN','eTRAIN').replace('ePASSPORTFLIGHTlg','eFLIGHTlg');
        	}
        	try{
        		$.each(mergedata.hits.pairs, function(i,n){
	        		var fromData = {}, toData = {}, frombody = {}, tobody = {}, eventKey = '';
	        		$.each(mergedata.hits.events, function(j,m){
	        			if(m.gid == n.from){
	        				fromData = m;
	        			}else if(m.gid == n.to){
	        				toData = m;
	        			}
	        			if(!mining.utils.isEmpty(fromData) && !mining.utils.isEmpty(toData))return false;
	        		});
	        		eventKey = fromData.label.toLowerCase();
	        		if(eventKey == 'passporthotel_event'){
	        			eventKey = 'hotel_event';
	        		}else if(eventKey == 'passporttrain_event'){
	        			eventKey = 'train_event';
	        		}else if(eventKey == 'passportflightlg_event'){
	        			eventKey = 'flightlg_event';
	        		}
	        		fromData = mining.mappingutils.getProperties(fromData, 'fields');
	        		toData = mining.mappingutils.getProperties(toData, 'fields');
	        		if($.inArray(eventKey, eventArr) < 0){
	        			eventArr.push(eventKey);
	        			var _keyArr = mining.mapping.hartsEventMapping[eventKey] || '';
	        			eventPoopArr[eventKey] =  _keyArr.split(',') || [];
	        			tableData[eventKey] = {head:[], body:[]};
	        			$.each(eventPoopArr[eventKey], function(j,m){
	        				if(mining.utils.isEmpty(fromData[m]) && mining.utils.isEmpty(toData[m]))return;
			        		tableData[eventKey].head.push({
			        			label: m,
			        			name: mining.mappingutils.getPropLabel(m)
			        		});
			        	});
	        		}
	        		$.each(eventPoopArr[eventKey], function(j,m){
	        			var proname = m,
	        				fdata = fromData[m] ? fromData[m].value : '',
	        				tdata = toData[m] ? toData[m].value : '';
	        				
	        			if(mining.utils.isEmpty(fdata)){
	        				var proname = changePro(m);
	        				fdata = fromData[proname] ? fromData[proname].value : '';
	        			}
	        			if(mining.utils.isEmpty(tdata)){
	        				var proname = changePro(m);
	        				tdata = toData[proname] ? toData[proname].value : '';
	        			}
		        		frombody[unchangePro(m)] = fdata;
		        		tobody[unchangePro(m)] = tdata;
		        	});
		        	tableData[eventKey].body.push([frombody, tobody]);
	        	});

        		// propArr = mining.mapping.hartsEventMapping[mergedata.l[0].label.toLowerCase()].split(',') || [];
        		return tableData;
	        	
        	}catch(e){}
        },
        /**
		 * @name Utils#setTransform
	     * @function   
	     * @desc 设置transform。
	     * @param {Object} element	【必选】
	     * @param {Object} value	【必选】
	     * @param {Object} key
	     * @return {Object} element
	     */
        setTransform: function(element, value, key) {
			key = key || "Transform";
			["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
				$.each(element, function(){
					var val = $(this)[0].style[prefix + key];
					if(key.toLowerCase() == 'transform' && !mining.utils.isEmpty(val)){
						var _valArr = val.split(' '),
							_valueArr = value.split(' '),
							_keys = [];
						
						$.each(_valueArr, function(i,n){
							_keys.push(n.substring(0, n.indexOf('(')));
						});
						$.each(_valArr, function(i,n){
							var _index = _keys.indexOf(n.substring(0, n.indexOf('(')));
							if(_index == -1){
								_valueArr.push(n);
							}
						});
						$(this)[0].style[prefix + key] = _valueArr.join(' ');
					}else{
						$(this)[0].style[prefix + key] = value;	
					}
				});
			});	
			
			return element;
		},
        /**
         * @name Utils#checkImg
	     * @function   
	     * @desc 图片加载失败替换方法。
	     * @param {Object} $imgs	【必选】
	     * @param {String} imgsrc	【必选】
	     * @example
	     * define(function(require){
	     *     $(function(){
	     *         //图片加载失败替换为404图
	     *         setTimeout(function(){
	     *             mining.utils.checkImg($('.avatar img'),'/images/pic/avatar404.jpg');
	     *             mining.utils.checkImg($('.avatar_mid img'), '/images/pic/avatar404_middle.jpg');
	     *         },500);
	     *     });
	     * });
	     */
        checkImg:function($imgs, imgsrc){
            if(mining.utils.isEmpty($imgs) || $imgs.size() < 1) return;
            $imgs.each(function(){
                mining.utils.imgloaderror(this, function(){
	            	var _src = $(this).attr('_src');
	            	if(mining.utils.isEmpty(imgsrc) && mining.utils.isEmpty(_src)) return;
	            	if(!mining.utils.isEmpty(_src)) imgsrc = _src;
                    this.src = imgsrc;
                });
            });
        },
        dateFormat:function(oDate, format){
        	var o = {
	            "M+": oDate.getMonth() + 1, //month
	            "d+": oDate.getDate(), //day
	            "h+": oDate.getHours(), //hour
	            "m+": oDate.getMinutes(), //minute
	            "s+": oDate.getSeconds(), //second
	            "q+": Math.floor((oDate.getMonth() + 3) / 3), //quarter
	            "S": oDate.getMilliseconds() //millisecond
	        }
	        if (/(y+)/.test(format)) {
	            format = format.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	        }
	        for (var k in o) {
	            if (new RegExp("(" + k + ")").test(format)) {
	                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	            }
	        }
	        return format;
        },
        /**
         * @name Utils#loadLogin
	     * @function   
	     * @desc 弹出登陆框。
	     */
		loadLogin: function(option){
			var op = $.extend({
				container: '',
				message: '',
				success: null,
				error: null
			}, option),
			isdialog = false,
			$loginbox = typeof op.container == 'string' ? $(op.container) : op.container,
			loginTmpl =  ['<div class="login_body">',
				'<div class="center_continer">',
					'<div class="login_content">',
						'<div class="downloadtip">当前浏览器版本过低，请点击<a title="下载Chrome46" href="' + staticUrl + '/download/ChromeStandalone_46.0.2490.86_Setup.1447296650.exe">“下载”</a>安装较新的浏览器版本</div>',
						'<form method="post" class="loginform" onsubmit="return false;">',
							'<div class="logo login_row"></div>',
							'<div class="login_row"><input type="text" name="username" class="input_info input_user"/></div>',
							'<div class="login_row"><input type="password" name="password" class="input_info input_pwd"/></div>',
							'<div class="login_row" style="height:1px;margin:0 108px;">',
								/*'<a href="javascript://" class="px;heck checked" value="0">用户</a>	<a href="javascript://" class="a_check uncheck" value="1">管理员</a>',*/
							'</div>',
							'<div class="login_row row_btn">',
								/*'<select name="group"  class="group_select">',
									'<option value="直辖市公安局" selected="selected">直辖市公安局</option>',
									'<option value="直辖市公安局" selected="selected">直辖市公安局2</option>',
								'</select>',*/
								'<button class="login_btn font14 pull-right">登录</button>',
								'<button href="javascript:;" class="login_pki_btn font14 pull-left">PKI登录</button>',
								'<span class="errortip"></span>',
							'</div>',
							'<div class="login_row pki_btn">',
								'<span class="nomargin pull-left"><a href="javascript://" class="a_check checked" value="0">用户</a>	<a href="javascript://" class="a_check uncheck" value="1">管理员</a></span>',
								'<span class="nomargin pull-right"><a href="http://qbbigdata.sjzs.eb/qbbigdata.cer" target="_blank">下载证书</a></span>',
								/*'<span><a href="javascript:;" class="login_pki_btn">PKI登录</a></span>',*/
							'</div>',
							'<span class="mask_uname"></span><span class="mask_pwd"></span>',
						'</form>',
					'</div>',
				'</div>',
			'</div>'].join('');
			
			var initLoginEvent = function(){
				$('#impot-file-state').remove();
				if(mining.browser && mining.browser.ua == 'chrome' && mining.browser.v < 46)$('.downloadtip',$loginbox).show();
				$('.errortip',$loginbox).html(op.message);
				$('.a_check',$loginbox).on('click', function(e) {
					$(this).siblings().removeClass('checked').addClass('uncheck').removeAttr('checked');
					$(this).addClass('checked').attr('checked', 'checked');
				});
				$('select',$loginbox).select2({
			    	dropdownCssClass: 'select2-login'
		    	});
    	
		    	//修正浏览器自动填充密码后的黄色背景
		    	mining.utils.fixAutoFill();
		    	
		    	//登录
		    	var $form = $('.loginform',$loginbox),timer;
		    	var submitLogin = function(){
		    		$('.errortip',$form).hide().empty();
		    		var submitData = {
		    			username: $('[name=username]',$form).val(),
		    			password: $('[name=password]',$form).val(),
		    			type: $('.a_check.checked',$loginbox).attr('value')
		    		};
		    		
		    		if(mining.utils.isEmpty(submitData.username)){
		    			$('.errortip',$form).show().html('请输入用户名');
		    			return false;
		    		}
		    		if(mining.utils.isEmpty(submitData.password)){
		    			$('.errortip',$form).show().html('请输入密码');
		    			return false;
		    		}
		    		clearTimeout(timer);
		    		timer = setTimeout(function(){
		    			$('.login_btn',$form).html('登录中...');
		    		}, 1000);
		    		if(!isdialog)mining.utils.closeDlg();
		    		//本地调试
					/*if(!mining.isonline){
						var userinfo = {username: submitData.username};
						var user = {
							"user_id": userinfo.username,
							"name":userinfo.username,
							"email":userinfo.username+"@mininglamp.com",
							"password":"",
							"cell":"",
							"unit":"SCOPA_DEV",
							"unit_name":"SCOPA_DEV",
							"authority":[1, 2, 10, 11, 12, 13, 14, 15, 16, 17]
						}
						$('.navbar .userinfo').html(user.name).attr('title',user.name);
						mining.userinfo = user;
						mining.utils.closeDlg()
						if(window.location.href.indexOf('index.html')){
							mining.utils.clearLocalData();
							mining.utils.localStorage(mining.localname.config, {username:user.name});
							mining.utils.gotoUrl((submitData.type == '0' ? 'core' : 'console') + '.html');
						}
						return;
					}*/
		    		$ajax.ajax({
		    			url: mining.baseurl.pass + '/login',
		    			data: submitData,
		    			type: 'post',
		    			success: function(data){
		    				mining.utils.closeDlg();
		    				if(isdialog && mining.utils.isEmpty(op.success)){
		    					mining.utils.clearLocalData();
		    					mining.utils.getUserInfo(function(){
		    						mining.utils.closeDlg();
		    						mining.utils.gotoUrl((window.location.href.indexOf('core.html') != -1 ? 'core' : 'console') + '.html');
		    					});
		    				}
		    				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data, submitData);
		    			},
		    			error: function(data){
		    				if(data && data.message){
		    					if(data.message.length && data.message.length > 30){
		    						$('.errortip',$form).show().html('登录失败，请稍后重试');
		    						$dialog.alert(data.message, 'error',30000);
		    					}else{
			    					$('.errortip',$form).show().html(data.message);
		    					}
		    				}else{
		    					$('.errortip',$form).show().html('登录失败，请稍后重试');
		    				}
		    				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
		    			},
		    			complete: function(){
		    				clearTimeout(timer);
		    				$('.login_btn',$form).html('登录');
		    			}
		    		});
		    		mining.utils.serverLog(1, (submitData.type == '0' ? 'core' : 'console'));//用户行为记录
		    	}
		    	
		    	$('[name=username],[name=password]',$form).on('focus', function(){
		    		$('.errortip',$form).empty();
		    	});
		    	$('[name=password]',$form).off('keydown').on('keydown', function(e){
		    		if(e.keyCode==mining.keyCode.ENTER){
		    			submitLogin();
		    		}
		    		mining.utils.stopBubble(e);
		    	});
		    	$('.login_btn',$form).on('click', submitLogin);
				$('.login_pki_btn',$form).off('click').on('click',function (e) {
					var submitData = {
						type: $('.a_check.checked',$loginbox).attr('value')
					}
					
					$.ajax({
						url:'https://qbbigdata.sjzs.eb:8443/console/services/plugin/gongan/auth/pkiLogin',
						success: function(data){
							if(data && data.statusCode == '200') {
								var exp=new Date();
								exp.setTime(exp.getTime()+30*24*3600*1000);
								document.cookie="TUNING_SESSION_ID="+data.map.TUNING_SESSION_ID+";expires="+exp.toGMTString();
			    				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data, submitData);
								//document.location.href='http://qbbigdata.sjzs.eb/core.html';
							}
						},
						error: function(data){}
					});
					mining.utils.serverLog(2, (submitData.type == '0' ? 'core' : 'console'));//用户行为记录
					if(isdialog)return false;
				});
			}
			if($loginbox.size() > 0){
				isdialog = false;
				$loginbox.html(loginTmpl);
				initLoginEvent();
			}else{
				isdialog = true;
				mining.utils.closeDlg()
				//本地调试
				/*if(!mining.isonline || window.location.href.indexOf('console.html') != -1){
					var userinfo = mining.utils.localStorage(mining.localname.config) || {username:'admin'};
					var user = {
						"user_id": userinfo.username,
						"name":userinfo.username,
						"email":userinfo.username+"@mininglamp.com",
						"password":"",
						"cell":"",
						"unit":"SCOPA_DEV",
						"unit_name":"SCOPA_DEV",
						"authority":[1, 2, 10, 11, 12, 13, 14, 15, 16, 17]
					}
					$('.navbar .userinfo').html(user.name).attr('title',user.name);
					mining.userinfo = user;
					mining.utils.localStorage(mining.localname.config, {username:user.name});
					mining.utils.closeDlg()
					return;
				}*/
				setTimeout(function(){
					$dialog({
						id: 'loginDialog',
						title: false,
						content: loginTmpl,
						padding: 0,
						onshow: function(){
							mining.utils.modalLoading('close');
							var $node = $(this.node);
							
							$('.artui-dialog,.artui-dialog-body,.login_body',$node).css({
								'background': 'none',
								'box-shadow': 'none'
							})
							$('.artui-dialog-grid',$node).attr('style','border:0!important');
							$('.artui-dialog',$node).css('border','none');
							$('.main').addClass('blur');//添加背景模糊效果
							$loginbox = $(this.node);
							this.width($('.loginform',$loginbox).width());
							this.height($('.loginform',$loginbox).height());
							initLoginEvent();
						},
			    		onclose: function(){
			    			$('.main').removeClass('blur');//去除背景模糊效果
			    			if($('.userinfo').text().indexOf('...')!=-1)mining.utils.gotoUrl('./index.html');
			    		}
					}).showModal();
				}, 100);
			}
		},
		loading: function(content){
			$(content).html('<tr><td colspan="12" style="height:70px" class="loading">&nbsp;</td></tr>');
		},
		removeloading:function(content){
			$(content).html('');
		},
        /**
         * @name Utils#clearLocalData
	     * @function   
	     * @desc 清除本地数据缓存。
	     */
        clearLocalData:function(){
            $.each(mining.localname, function(i,n){
            	mining.utils.removeStorage(n);
            });
        },
        getPos: function(){
        	var posArr = [], panPos = dragon.pan();
        	$.each(dragon.$('edge.relation'), function(i,n){
        		var edgeData = n.data(),
        			sourcePos = dragon.$('#'+edgeData.source).position(),
        			targetPos = dragon.$('#'+edgeData.target).position();
        		
        		posArr.push({
        			x1: sourcePos.x + panPos.x,
        			y1: sourcePos.y + panPos.y,
        			x2: targetPos.x + panPos.x,
        			y2: targetPos.y + panPos.y
        		});
        	});
        	
        	return posArr;
        },
        /**
         * @name Utils#modalLoading
	     * @function   
	     * @desc 全局模态loading。
	     */
        modalLoading:function(action){
        	if(action == 'close' || $dialog.get('loginDialog')){
        		try{
        			$dialog.get('modalLoading').close().remove();
        		}catch(e){}
        		return;
        	}
        	$dialog({
        		id: 'modalLoading',
        		title: false,
				width: 300,
				height:350,
        		content: '<div id="modalLoading"><span class="loadingmsg">加载数据中，请您稍等......</span></div>',
        		onshow: function(){
        			var $node = $(this.node), top = 60;
        			$node.addClass('modalLoading');
        			if($node.parents('.sbody').size() < 1)top = 0;
        			$('.artui-mask').css({
        				'background': 'rgba(255,255,255,1)',
        				'opacity': '0.7',
        				'top': top + 'px',
        				'overflow': 'visible'
        			}).append('<div style="width:100%;height:60px;position:relative;top:-60px;background:rgba(255,255,255,0);"></div>');
        			$('.artui-dialog',$node).attr('style','border:none!important')
        			try{
		    			$dialog.get('Alert').close().remove();
		    		}catch(e){}
        		}
        	}).showModal();
        },
        /**
         * @name Utils#loadingMsg
	     * @function   
	     * @desc 全局模态loading提示消息。
	     */
        loadingMsg:function(msg){
        	if(mining.utils.isEmpty(msg))return;
        	
        	try{
        		$($dialog.get('modalLoading').node).find('.loadingmsg').html(msg);
        	}catch(e){}
        },
        /**
         * @name Utils#closeDlg
	     * @function   
	     * @desc 关闭弹框。
	     */
        closeDlg:function(id){
        	try{
        		if(mining.utils.isEmpty(id)){
        			$.each($dialog.list, function(i,n){n.close().remove();})
	        	}else{
	        		$dialog.get(id).close().remove();
	        	}
        	}catch(e){}
        },
        /**
         * @name Utils#isDaylightTime
	     * @function   
	     * @desc 判断是否夏令时。
	     */
        isDaylightTime:function(date){
        	try{
        		/*1986年5月4日至9月14日（1986年因是实行夏令时的第一年，从5月4日开始到9月14日结束）
				1987年4月12日至9月13日，
				1988年4月10日至9月11日，
				1989年4月16日至9月17日，
				1990年4月15日至9月16日，
				1991年4月14日至9月15日。*/
        		var _date = typeof date == 'string' ? (date.indexOf('-') == -1 ? moment(parseInt(date)) : moment(date)) : (typeof date == 'number' ? moment(date) : date);
        	
				return  _date.isBetween('1986-05-04 02:00:00', '1986-09-14 02:00:00') || 
						_date.isBetween('1987-04-12 02:00:00', '1987-09-13 02:00:00') || 
						_date.isBetween('1988-04-10 02:00:00', '1988-09-11 02:00:00') || 
						_date.isBetween('1989-04-16 02:00:00', '1989-09-17 02:00:00') || 
						_date.isBetween('1990-04-15 02:00:00', '1990-09-16 02:00:00') || 
						_date.isBetween('1991-04-14 02:00:00', '1991-09-15 02:00:00')
        	}catch(e){
        		return false;
        	}
        },
        /**
         * @name Utils#getUTCTime
	     * @function   
	     * @desc 修正夏令时。
	     */
        getUTCTime:function(date, format){
        	try{
    			var _date = typeof date == 'string' ? ((date.indexOf('-') == -1 || date.indexOf('-') == 0) ? moment(parseInt(date)) : moment(date)) : (typeof date == 'number' ? moment(date) : date);
        		if(mining.utils.isDaylightTime(date))_date.add('hour', 1);
        		
        		return format ? _date.format(format) : _date;
        	}catch(e){
        		return date;
        	}
        },
        /**
         * @name Utils#chartResize
	     * @function   
	     * @desc 修正图析内存占用问题。
	     */
        chartResize:function(type){
        	try{
    			if(window.SCOPA_ChartResize_timer)clearInterval(window.SCOPA_ChartResize_timer);
    			if(type && type == 'close')return;
    			window.SCOPA_ChartResize_timer = setInterval(function(){
    				var $box,_h;
    				
    				window.SCOPA_ChartResize_timer_run = true;
    				//图析
    				if(window.dragon){
    					$box = $('#graphChart');
    					_h = $box.height();
    					$box.height(_h+10);
	    				dragon.resize();
	    				$box.height($box.parents('.graph:first').height());
	    				dragon.resize();
    				}
    				//档案
    				if(window.filegraph1 || window.filegraph2){
    					$box = $('.page-file .infolist.relatedchart:visible:first');
    					_h = $box.height();
    					$box.height(_h+10);
    					if(window.filegraph1)filegraph1.resize();
    					if(window.filegraph2)filegraph2.resize();
	    				$box.height($box.parent().height());
	    				if(window.filegraph1)filegraph1.resize();
    					if(window.filegraph2)filegraph2.resize();
    				}
    				window.SCOPA_ChartResize_timer_run = false;
    				seajs.log('*** chartResize ***');
    			},10000);
        	}catch(e){}
        },
		/**
		 * @name Utils#random
	     * @function   
	     * @desc 生成随机数，范围是[min, max]。
	     * @param {Number} min		【必填】
	     * * @param {Number} max	【必填】
	     * @return {Number} number
	     * @example
	     * define(function(require){
	     *     $(function(){
	     *         mining.utils.random(1, 10);		//9.584237090392978
	     *     });
	     * });
	     */
		random:function(min, max){
		    return Math.random() * (max - min + 1) + min;
		},
		/**
         * @name Utils#updateFileData
	     * @function
	     * @param {Object} data【必填】
	     * @param {String} type：add/del【必填】
	     * @param {String} tabData：tabId【可选】
	     * @desc 维护档案页数据结构。
	     */
	    updateFileData:function(type,arg,callback){
	    	var fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot) || {},
	    		itemData = {};
	    	if(!fileSnapshot.current)fileSnapshot.current = '';
	    	if(!fileSnapshot.navtabs)fileSnapshot.navtabs = {};
			if(!fileSnapshot.filedata)fileSnapshot.filedata = {};
			if(!fileSnapshot.filecount)fileSnapshot.filecount = {};
	    	switch(type){
	    		case 'del':
	    			// if(!mining.utils.isEmpty(fileSnapshot.current)){mining.utils.saveFileHistory(fileSnapshot);}
	    			// mining.utils.saveFileHistory();
	    			fileSnapshot = mining.utils.delFileDataAction(fileSnapshot,arg);
	    			break;
	    		case 'changeTab':
	    			fileSnapshot = mining.utils.changeTabFileDataAction(fileSnapshot,arg);
	    			break;
	    		case 'changeItem':
	    			fileSnapshot = mining.utils.changeItemFileDataAction(fileSnapshot,arg);
	    			break;
	    		case 'addItem':
	    			// if(!mining.utils.isEmpty(fileSnapshot.current)){mining.utils.saveFileHistory(fileSnapshot);}
	    			// mining.utils.saveFileHistory();
	    			fileSnapshot = mining.utils.addFileDataAction(fileSnapshot,arg,function(data){
	    				itemData = data;
	    			});
	    			break;
	    		case 'changeKey':
	    			fileSnapshot = mining.utils.changeKeyAction(fileSnapshot,arg);
	    			break;
	    		default:
	    			// if(!mining.utils.isEmpty(fileSnapshot.current)){mining.utils.saveFileHistory(fileSnapshot);}
	    			// mining.utils.saveFileHistory();
	    			fileSnapshot = mining.utils.addTabDataAction(fileSnapshot,arg,function(data){
	    				itemData = data;
	    			});
	    			break;
	    	}
	    	// TODO: 与历史最后一步操作合并数据
	    	mining.utils.localStorage(mining.localname.fileSnapshot,fileSnapshot);
	    	if(type == 'del' || (type == "addItem" && itemData.length > 0) || type == "add"){
	    		mining.utils.saveFileHistory();
	    	}
	    	if(callback)callback(itemData);
	    },
	    addTabDataAction:function(snapshot,arg,callback){
	    	if(arg.dataArr.length === 0)return;
	    	var dataArr = arg.dataArr,
	    		itemData = dataArr[0],
	    		randomNum = parseInt(Math.random()*1000).toString(),
	    		tabData = {
		    		tabid: 'tab' + itemData.gid + randomNum,
		    		tabtitle: '&nbsp;',
		    		tabtype: arg.tabType || '1',
		    		filelist: [],
		    		grouplist: [],
		    		current: itemData.gid
		    	};
		    if(arg.tabType == '1'){
		    	if(mining.mappingutils.getTitle(itemData) && mining.mappingutils.getTitle(itemData) != ''){
		    		tabData.tabtitle = mining.mappingutils.getTitle(itemData);
		    	}
	    	}else if(arg.tabType == '2'){
	    		tabData.tabid = 'tab' + itemData.label.id + randomNum;
	    		tabData.current = itemData.label.id;
	    		tabData.tabtitle = itemData.label.name;
	    	}else{
	    		// console.log(itemData);
	    		tabData.tabtitle = itemData.filename;
	    	}

	    	$.each(dataArr,function(i,n){
	    		var itemId = n.gid;
	    		if(arg.tabType == '1'){
	    			tabData.filelist.pushOnly(itemId);
	    		}else if(arg.tabType == '2'){
	    			itemId = n.label.id;
	    			tabData.grouplist.pushOnly(itemId);
	    		}
	    		if(!snapshot.filecount.hasOwnProperty(itemId)){
	    			snapshot.filecount[itemId] = 0;
	    		}
	    		snapshot.filecount[itemId]++;
	    		if(!snapshot.filedata.hasOwnProperty(itemId)){
	    			snapshot.filedata[itemId] = n;
	    		}
		    });
	    	if(callback)callback(tabData);
	    	snapshot.navtabs[tabData.tabid] = tabData;
	    	snapshot = mining.utils.changeTabFileDataAction(snapshot,{tabId:tabData.tabid});
	    	return snapshot;
	    },
	    addFileDataAction:function(snapshot,arg,callback){
	    	// if(arg.dataIdArr.length == 0)return;
	    	var dataArr = arg.dataArr,
	    		tabId = arg.tabId,
	    		tabType = arg.tabType,
	    		tabData = snapshot.navtabs[tabId],
	    		addItemDataArr = [];
	    	$.each(dataArr,function(i,n){
	    		tabData.filelist.pushOnly(n.gid);
	    		var itemId = n.gid;
	    		if(!snapshot.filecount.hasOwnProperty(itemId)){
	    			snapshot.filecount[itemId] = 0;
	    		}
	    		snapshot.filecount[itemId]++;
	    		if(!snapshot.filedata.hasOwnProperty(itemId)){
	    			snapshot.filedata[itemId] = n;
	    			addItemDataArr.push(n);
	    		}
	    	});
	    	if(callback)callback(addItemDataArr);
	    	snapshot.navtabs[tabId] = tabData;
    		snapshot = mining.utils.changeItemFileDataAction(snapshot,{tabId:tabId,itemId:dataArr[0].gid});
	    	return snapshot;
	    },
	    delFileDataAction:function(snapshot,arg){
	    	var dataIdArr = arg.dataIdArr,
	    		tabId = arg.tabId,
	    		tabData = snapshot.navtabs[tabId],
	    		isDelTab = false,
	    		isChangeNewItem = false,
	    		isDocFile = false;
	    	if(tabData.tabtype == 3){
	    		isDocFile = true;
	    		snapshot.filecount[tabId]--;
	    		delete snapshot.filedata[tabId];
	    	}
	    	// if(isDocFile || dataIdArr.length == 0 || (tabData.filelist.length != 0 && (tabData.filelist.length == dataIdArr.length))){
	    	// 	delete snapshot.navtabs[tabId];
	    	// 	// isDelTab = true;
	    	// 	// var willChanged = null;
	    	// 	if(snapshot.current == tabId){
	    	// 		$.each(snapshot.navtabs,function(k,v){
	    	// 			snapshot = mining.utils.changeTabFileDataAction(snapshot,{tabId:k});
	    	// 			return;
	    	// 		});
		    // 		// snapshot = mining.utils.changeTabFileDataAction(snapshot,{tabId:snapshot.navtabs});
		    // 	}
	    	// }
	    	$.each(dataIdArr,function(i,n){
	    		var itemId = n;
	    		// if(!isDelTab){
	    			if(itemId == tabData.current){
	    				isChangeNewItem = true;
	    			}
	    			snapshot.navtabs[tabId].filelist.remove(itemId);
	    			snapshot.navtabs[tabId].grouplist.remove(itemId);
	    		// }
	    		if(snapshot.filecount.hasOwnProperty(itemId)){
	    			snapshot.filecount[itemId]--;
	    			if(snapshot.filecount[itemId] == 0){
	    				delete snapshot.filecount[itemId];
	    				delete snapshot.filedata[itemId];
	    			}
	    		}
	    	});
	    	if(isDocFile || (snapshot.navtabs[tabId].filelist.length == 0 && snapshot.navtabs[tabId].grouplist.length == 0)){
	    		delete snapshot.navtabs[tabId];
	    		isDelTab = true;
	    		var newTabId = '';
	    		// var willChanged = null;
	    		if(snapshot.current == tabId){
	    			$.each(snapshot.navtabs,function(k,v){
	    				newTabId = k;
	    				return;
	    			});
	    			snapshot = mining.utils.changeTabFileDataAction(snapshot,{tabId:newTabId});
		    		// snapshot = mining.utils.changeTabFileDataAction(snapshot,{tabId:snapshot.navtabs});
		    	}
	    	}
	    	if(isChangeNewItem && !isDelTab){
    			snapshot = mining.utils.changeItemFileDataAction(snapshot,{tabId:tabId,itemId:snapshot.navtabs[tabId].grouplist[0] || snapshot.navtabs[tabId].filelist[0]});
    			// snapshot = mining.utils.changeTabFileDataAction(snapshot,{tabId:tabId,itemId:});
    		}

	    	return snapshot;
	    },
	    changeTabFileDataAction:function(snapshot,arg){
	    	// if(!arg.tabId)return;
	    	// if(arg.tabId){
	    		snapshot.current = arg.tabId;
	    		return snapshot;
	    	// }
	    },
	    changeItemFileDataAction:function(snapshot,arg){
	    	// if(!arg.tabId && !arg.itemId)return;
	    	// if(!arg.tabId && !arg.itemId){
				snapshot.navtabs[arg.tabId].current = arg.itemId;
	    		return snapshot;
	    	// }
		},
		changeKeyAction: function(snapshot,arg){
			var dataKey = arg.keyId,
				newDataKey = arg.newKeyId,
				docId = arg.docId,
				newDocId = arg.newDocId,
				tabDataObj = snapshot.navtabs[dataKey],
				fileDataObj = snapshot.filedata[docId],
				fileCount = snapshot.filecount[docId];

			tabDataObj.tabid = newDataKey;
			tabDataObj.current = newDocId;
			delete snapshot.navtabs[dataKey];
			snapshot.navtabs[newDataKey] = tabDataObj;
			fileDataObj.gid = newDocId;
			delete snapshot.filedata[docId];
			snapshot.filedata[newDocId] = fileDataObj;

			delete snapshot.filecount[docId];
			snapshot.filecount[newDocId] = fileCount;
			snapshot.current = newDataKey;
			return snapshot;
		},
		
		/**
		 * @name Utils#serverLog
	     * @function   
	     * @desc 记录用户操作行为日志。
	     * @param {Number} operateid
	     * @return {String} content
	     */
		serverLog:function(operateid,content){
			var SCOPA_searvelog = require('./serverlog');
			
			content = content || '';
			if(!SCOPA_searvelog['op_' + operateid]){
				console.log('%c[ServerLog-ERROR] %c操作点ID：' + operateid + ' 有误，请检查','color:red','');
				return;
			}
		    $ajax.ajax({
		    	url: mining.baseurl.console + '/stat/log',
		    	data: {
		    		user_id: mining.userinfo.user_id || '',
		    		opid: JSON.stringify({
						opid: operateid,
						content: content,
						browser: mining.browser
					})
		    	},
		    	success: function(){
		    		console.table({
		    			'[ServerLog-SUCCESS]':{
			    			'操作点': SCOPA_searvelog['op_' + operateid],
			    			'内容要求': SCOPA_searvelog['con_' + operateid],
			    			'内容值': content,
			    			'ID': operateid
		    			}
	    			});
		    	},
		    	error: function(){
		    		console.table({
		    			'[ServerLog-ERROR]':{
			    			'操作点': SCOPA_searvelog['op_' + operateid],
			    			'内容要求': SCOPA_searvelog['con_' + operateid],
			    			'内容值': content,
			    			'ID': operateid
		    			}
	    			});
		    	}
		    });
		},
		/**
		 * @name Utils#toAppHome
	     * @function   
	     * @desc 返回应用首页。
	     */
		toAppHome: function(){
			window.toAppHome = window.top.toAppHome = true;
			var _hash = $.hash();
			if(mining.utils.isEmpty(_hash) && window.top){
				window.top.mining.utils.hashChange('app');
				return;
			}
			mining.utils.hashChange('app');
		},
		/**
		 * @name Utils#getHartsData
	     * @function   
	     * @desc 获取harts边event数据。
	     */
		getHartsData: function(option){
			var op = $.extend({
				data: null,
				success: null,
				error: null
			},option);
			
			if(mining.utils.isEmpty(op.data) || mining.utils.isEmpty(op.success))return;
			$ajax.ajax({
				url: mining.baseurl.hartsevent,
				data: {
					eid0: op.data.from_key,
					eid1: op.data.to_key,
					eventLabel: mining.mappingutils.getHartEvents(op.data).join(','),
					ruleId: mining.mappingutils.getRuleIds(op.data).join(',')
				},
				success: function(result){
					if(op.success)op.success(result);
				},
				error: function(result){
					if(op.error)op.error(result);
				}
			});
		},
		/**
		 * @name Utils#judgedDataByPhones
	     * @function   
	     * @desc 跳转到研判话单模式并分析通话数据。
	     */
		judgedDataByPhones: function(phoneArr){
			if(mining.utils.isEmpty(phoneArr)){
				$dialog.alert('未获取到任何话单数据', 'warning');
				return;
			}
			$dialog({
				title: '研判-话单分析',
		        content: '<span class="artui-dialog-confirm"></span><span>是否清空话单已有分析结果？</span>',
		        button:[{
		            value: '是',
		            callback: function () {
		                scopaConfig.pages.judged.getJudgedDataByPhones(phoneArr,true);
		        		mining.utils.hashChange('ticket');
		        		mining.utils.closeDlg();
		            },
		            autofocus: true
		        },
		        {
		            value: '否',
		            callback: function () {
		                scopaConfig.pages.judged.getJudgedDataByPhones(phoneArr,false);
		        		mining.utils.hashChange('ticket');
		        		mining.utils.closeDlg();
		            }
		        },
		        {
		            value: '取消'
		        }]
			}).showModal();
		},
		/**
		 * @name Utils#fileDownload
	     * @function   
	     * @desc 文件下载方法。
	     */
		fileDownload: function(actionUrl,parms, method){
			var form = document.createElement("form");  
		 	form.style.display='none';;  
		 	form.action = actionUrl;  
		 	form.method= method || "post";  
		 	document.body.appendChild(form); 
		 	
		 	for(var key in parms){
		  		var input = document.createElement("input");  
		  		input.type = "hidden";  
		  		input.name = key;  
		  		input.value = parms[key];  
		  		form.appendChild(input);  
		 	}  
		 	form.submit();  
		   	form.remove();
		},
		/**
		 * @name Utils#getVertex
	     * @function   
	     * @desc 根据身份证号获取信息，支持批量。
	     */
    	getVertex: function(ids, callback){
    		ids = ids || '';
    		if($.isArray(ids)){
    			ids = ids.join(',');
    		}
    		if(mining.utils.isEmpty(ids)){
    			if(callback)callback({v:[],e:[]});
    			return;
    		}
	        $ajax.ajax({
	            url: mining.baseurl.core + '/query/getVertexByIndex',
	            data: {
	                value: ids,
	                index: 'key'
	            },
	            success: function(data){
	                callback(data);
	            },
	            error: function(data){
	                mining.utils.alertMsg(data, '获取信息失败，请稍后重试！', 'error');
	            }
	        });
	    },
		/**
		 * @name Utils#showPhoneGraph
	     * @function   
	     * @desc 话单显示到图析或地图。
	     */
    	showPhoneGraph: function(ids, type){
    		type = type || 'graph';
    		mining.utils.getVertex(ids, function(data){
    			require('core/common/showelement').show(data, type);
    			if(type == 'graph' && data && data.v.length > 0){
    				var timer, timemax = 0;
					timer = setInterval(function(){
						if(dragon.$('#' + data.v[0].gid) || timemax > 100000){
							clearInterval(timer);
							if(window.graphmenuModule){
								var vids = [];
								$.each(data.v, function(i,n){
									vids.push(n.gid);
								})
								if(vids.length > 1)window.graphmenuModule.expandRelation(vids,[],1,'',true);
							}
						}
						timemax += 100;
					},100);
    			}
    		});
	    },
		/**
		 * @name Utils#openEventChart
	     * @function   
	     * @desc 剔除data中的event并用弹框展示。
	     */
	    openEventChart: function(data,entity){
			if(!data.nodes)return data;
			
			var newData = {nodes:[], edges:[]},
				eventArr = [],
				delEdge = [];
				
			$.each(data.nodes, function(i,n){
				var ndata = n.data.data;
				if(ndata.etype == 'event'){
					eventArr.push(ndata);
					if(mining.utils.isEmpty(data.nodes))return;
					$.each(data.edges, function(j,m){
						var edata = m.data.data, eid = '';
						
						if(edata.from == ndata.gid){
							eid = edata.to;
						}else if(edata.to == ndata.gid){
							eid = edata.from;
						}
						if(eid != ''){
							delEdge.push(edata.gid);
							if(mining.utils.isEmpty(entity)){
								$.each(data.nodes, function(k,o){
									if(o.data.data.gid == eid){
										entity = o.data.data;
										return false;
									}
								})
							}
							
						}
					});
				}
			});
			if(eventArr.length > 0){
				$.each(data.nodes, function(i,n){
					if(n.data.data.etype != 'event')newData.nodes.push(n);
				});
				if(data.edges){
					$.each(data.edges, function(j,n){
						if(delEdge.indexOf(n.data.data.gid) == -1){
							newData.edges.psuh(n)
						}
					})
				}
				var timer, timemax = 0;
				timer = setInterval(function(){
					if(window.graphEventModule || timemax > 100000){
						clearInterval(timer);
						if(window.graphEventModule)window.graphEventModule.appenddata(entity, eventArr);
					}
					timemax += 100;
				},100);
			}else{
				newData = data;
			}
			return newData;
		},
		openSnapshot: function(option){
			require('core/common/snapshot').open(option);
		},
		formatHeatData: function(data){
			//heatmapOverlay.setDataSet({ data: hot, max: 3000 });
			//count: 244   lat: 38.038331   lng: 114.151785
			var countArr = [],
				newArr = [],
				limiter = {min:10, max:100};
				
			if(!data.data) return data;
			$.each(data.data, function(i,n){
				countArr.push(n.count);
			});
			var tmin = countArr.min(), 
				tmax = countArr.max(),
				ratio = (limiter.max - limiter.min) / (tmax - tmin);
			
			$.each(data.data, function(i,n){
				n.count = (n.count - tmin) * ratio + limiter.min;
				newArr.push(n.count)
			});
			data.max = limiter.max;
			
			return data;
		},
		/**
    	 * @name $.fn#table2xls
	     * @function   
	     * @desc json导出xls。
    	 * @param {Object} options
	     * @example
	     * define(function(require){
	     *     $(function(){
	     *         mining.utils.json2xls(data);
	     *     });
	     * });
	     */
		json2xls: function(options) {
        	var defaults = {
        			data: {thead:[],tbody:[]},
            		filename: '下载',
					ignoreColumn: [],
					consoleLog:'false'
				}
            
			var options = $.extend(defaults, options);
			var el = this;
			var excel="<table>";
			// Header
			$.each(options.data.thead, function(i,trs){
				excel += "<tr>";
				$.each(trs, function(index,data){
					if(defaults.ignoreColumn.indexOf(index) == -1){
						excel += "<td>" + data+ "</td>";
					}
				});
				excel += '</tr>';	
			});
			
			// Row Vs Column
			var rowCount = 1;
			
			$.each(options.data.tbody, function(i,trs){
				excel += "<tr>";
				var colCount=0;
				$.each(trs, function(index,data){
					if(defaults.ignoreColumn.indexOf(index) == -1){
						excel += "<td>"+data+"</td>";
					}
					colCount++;
				});
				rowCount++;
				excel += '</tr>';
			});
			excel += '</table>'
			
			if(defaults.consoleLog == 'true'){
				console.log(excel);
			}
			
			var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+defaults.type+"' xmlns='http://www.w3.org/TR/REC-html40'>";
			excelFile += "<head>";
			excelFile += "<!--[if gte mso 9]>";
			excelFile += "<xml>";
			excelFile += "<x:ExcelWorkbook>";
			excelFile += "<x:ExcelWorksheets>";
			excelFile += "<x:ExcelWorksheet>";
			excelFile += "<x:Name>";
			excelFile += "{worksheet}";
			excelFile += "</x:Name>";
			excelFile += "<x:WorksheetOptions>";
			excelFile += "<x:DisplayGridlines/>";
			excelFile += "</x:WorksheetOptions>";
			excelFile += "</x:ExcelWorksheet>";
			excelFile += "</x:ExcelWorksheets>";
			excelFile += "</x:ExcelWorkbook>";
			excelFile += "</xml>";
			excelFile += "<![endif]-->";
			excelFile += "</head>";
			excelFile += "<body>";
			excelFile += excel;
			excelFile += "</body>";
			excelFile += "</html>";
			
			var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
	    
		    var link = document.createElement("a");    
		    link.href = uri;
		    
		    link.style = "visibility:hidden";
		    link.download = defaults.filename + ".xls";
		    
		    document.body.appendChild(link);
		    link.click();
		    document.body.removeChild(link);
		}
	});
	
	/* jQuery 方法扩展 */
    (function($){
    	/* 自定义元素方法 */
    	$.extend($.fn,{
    		/**
        	 * @name $.fn#transform
    	     * @function   
    	     * @desc 设置transform。
	    	 * @param {Object} value	【必选】
	    	 * @param {Object} key
    	     */
    		transform: function(value, key){
    			return this.each(function(){
    				mining.utils.setTransform($(this), value, key);
    			});
    		},
    		/**
        	 * @name $.fn#table2xls
    	     * @function   
    	     * @desc table导出xls。
	    	 * @param {Object} options
		     * @example
		     * define(function(require){
		     *     $(function(){
		     *         $('.btn').on('click',{
		     * 				$('.table').table2xls({filename: '表格数据'});
		     * 			});
		     *     });
		     * });
    	     */
    		table2xls: function(options) {
                var defaults = {
                		filename: '下载',
						ignoreColumn: [],
						htmlContent:'false',
						consoleLog:'false'
					}
                
				var options = $.extend(defaults, options);
				var el = this;
				
				function parseString(data){
				
					if(defaults.htmlContent == 'true'){
						content_data = data.html().trim();
					}else{
						content_data = data.text().trim();
					}				
					
					return content_data;
				}
				
				//console.log($(this).html());
				var excel="<table>";
				// Header
				$(el).find('thead').find('tr').each(function() {
					excel += "<tr>";
					$(this).filter(':visible').find('th').each(function(index,data) {
						if ($(this).css('display') != 'none'){					
							if(defaults.ignoreColumn.indexOf(index) == -1){
								excel += "<td>" + parseString($(this))+ "</td>";
							}
						}
					});	
					excel += '</tr>';						
					
				});					
				
				
				// Row Vs Column
				var rowCount=1;
				$(el).find('tbody').find('tr').each(function() {
					excel += "<tr>";
					var colCount=0;
					$(this).filter(':visible').find('td').each(function(index,data) {
						if ($(this).css('display') != 'none'){	
							if(defaults.ignoreColumn.indexOf(index) == -1){
								excel += "<td>"+parseString($(this))+"</td>";
							}
						}
						colCount++;
					});															
					rowCount++;
					excel += '</tr>';
				});					
				excel += '</table>'
				
				if(defaults.consoleLog == 'true'){
					console.log(excel);
				}
				
				var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+defaults.type+"' xmlns='http://www.w3.org/TR/REC-html40'>";
				excelFile += "<head>";
				excelFile += "<!--[if gte mso 9]>";
				excelFile += "<xml>";
				excelFile += "<x:ExcelWorkbook>";
				excelFile += "<x:ExcelWorksheets>";
				excelFile += "<x:ExcelWorksheet>";
				excelFile += "<x:Name>";
				excelFile += "{worksheet}";
				excelFile += "</x:Name>";
				excelFile += "<x:WorksheetOptions>";
				excelFile += "<x:DisplayGridlines/>";
				excelFile += "</x:WorksheetOptions>";
				excelFile += "</x:ExcelWorksheet>";
				excelFile += "</x:ExcelWorksheets>";
				excelFile += "</x:ExcelWorkbook>";
				excelFile += "</xml>";
				excelFile += "<![endif]-->";
				excelFile += "</head>";
				excelFile += "<body>";
				excelFile += excel;
				excelFile += "</body>";
				excelFile += "</html>";
				
				var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
		    
			    var link = document.createElement("a");    
			    link.href = uri;
			    
			    link.style = "visibility:hidden";
			    link.download = defaults.filename + ".xls";
			    
			    document.body.appendChild(link);
			    link.click();
			    document.body.removeChild(link);
			}
    	});
	})(jQuery);
});