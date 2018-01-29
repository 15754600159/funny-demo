define(function(require, exports, module){
	
	var defaultConfig = {
		graphModule: null,
    	graph: null,
    	container: null,
    	callback: null
   	},
	requestUrl = {
		getByLabel: mining.baseurl.core + '/query/getByLabel',	//?vid='+_id+'&labels=[railway_record]
		getByHop: mining.baseurl.core + '/query/getByHop',	//?vid=12322&hop=3&limit=300&filters=[gmsfzhm:130xxxxxx,mz:eq:01]
		getPath: mining.baseurl.core + '/query/getPath',	//?vids=[16384,xxxxx,xxxx]&labels=[label1,label2]&hop=3
		expandEdge: mining.baseurl.core + '/query/expandEdge',	//?eid=XXX&label=XXX
		//getEventsByType: mining.baseurl.core + '/archive/getEventsByType',//?objId=130533198110084118&type=railway&pageNo=1&pageSize=10
		getEvents: mining.baseurl.core + '/archive/getEventsByType',//参数:objId 实体ID types 事件类型 JSONArray [hotel, railway] pageNo pageSize'
		merge: mining.baseurl.core + '/query/merge',	//POST 调用：参数 ids, events, rules, keyword(ids, events, rules 都是 JSONArray)
		getrule: mining.baseurl.console + '/rule/get'
	},
	graph = null,
	ruleList = [],
	secondExpanding = false,
	graphModule,
	eventModule,
	notesModule,
	loadtimer,
	loadtimegap = 1000;
	
    var initMenu = function(config){
    	
    	if($('#graphMenu').size() > 0) return;
    	
    	config = config || {};
		for(var key in config){
			config[key] = config[key] || defaultConfig[key];
		}
		graph = config.graph;
		graphModule = config.graphModule;
		eventModule = config.eventModule;
		notesModule = config.notesModule;
		var $container = (typeof config.container == 'string' ? $(config.container) : config.container);
		
		if($container.size() < 1) return;
		
		$ajax.ajax({
			url: staticUrl + '/scopa/template/core/graphmenu.html',
			async: false,
			success: function(tmpl){
				$('body').append(tmpl);
			}
		});
		formatSubMenu();
		
		require.async('./contextmenu', function(){
			$container.contextMenu('dragon',{
				onShowMenu: function(e, $menu){
					$ajax.ajax({
						url: staticUrl + '/scopa/template/core/graphmenu.html',
						async: false,
						success: function(tmpl){
							$('#graphMenu').remove();
							$('body').append(tmpl);
							$menu = $('#graphMenu');
							formatSubMenu();
						}
					});
					if(graph.$(':selected').length < 1 && graph.$('.mouseover').length > 0 && !graph.$('.mouseover').selected()){
						graph.$(':selected').unselect();
						graph.$('.mouseover').first().select();
					}
					
					$('.disabled',$menu).removeClass('disabled');
					if(graph.$(':selected').length > 0){
						var len_entity = graph.nodes('.entity:selected').length,
							len_event = graph.nodes('.event:selected').length,
							len_relation = graph.edges('.relation:selected').length,
							isEncrypted = true;
						
						$.each(graph.nodes(':selected'), function(i,n){
							if(n.data().name.indexOf('*') == -1){
								isEncrypted = false;
								return false;
							}
						});
						if(len_entity < 1){
							$('.graphmenu-expand-entity,.graphmenu-expand-event,.graphmenu-expand-relation',$menu).addClass('disabled');
						}else if(len_entity < 2){
							$('.graphmenu-expand-relation',$menu).addClass('disabled');
						}
						if(len_entity != 2){
							$('.graphmenu-compare-event',$menu).addClass('disabled');
						}
						if(len_entity == 1){
							var _key = graph.nodes('.entity:selected').data().data.key;
							if(!_key || _key.indexOf('*') != -1)$('.graphmenu-expand-entity,.graphmenu-expand-event,.graphmenu-expand-relation',$menu).addClass('disabled');
						}
					}else{
						$('.graphmenu-delete-other',$menu).siblings().addClass('disabled');
					}
					
					rebuildMenu($menu);
					
					if(len_entity == 0 && len_relation == 0){
						$('[action=view-file]',$menu).parent().hide();
						$('[action=view-map]',$menu).parents('li:first').transform('rotate(105deg) skew(60deg)');
						$('[action=view-map] span',$menu).transform('rotate(-100deg)');
					}else{
						$('[action=view-file]',$menu).parent().show();
						$('[action=view-map]',$menu).parents('li:first').transform('rotate(90deg) skew(60deg)');
						$('[action=view-map] span',$menu).transform('rotate(-115deg)');
					}
					
					
					return $menu;
				},
				bindings: {
					//实体扩展
					'expand-entity': function($node){
						if(graph.nodes(':selected').length < 1)return;
						
						var param = $node.attr('param'),
							eles = graph.nodes('.entity:selected');
						secondExpanding = false;
						if(param == 'more'){
							expandEntityMulti(eles);
							mining.utils.serverLog(31);//用户行为记录
						}else if(param == 'special'){
							collapseEntity(eles);
							mining.utils.serverLog(32);//用户行为记录
						}else{
							mining.utils.modalLoading();
							$.each(eles, function(i,n){
								var data = n.data().data;
								setTimeout(function(){
									expandEntity(data, param == 'all' ? [] : [param]);
								},300);
							});
							if(param == 'all'){
								mining.utils.serverLog(29);//用户行为记录
							}else if(param == 'harts'){
								mining.utils.serverLog(30);//用户行为记录
							}
						}
					},
					//事件扩展 
					'expand-event': function($node){
						if(graph.nodes(':selected').length < 1)return;
						
						var param = $node.attr('param'),
							eles = graph.nodes('.entity:selected');
						
						if(param == 'more'){
							expandEventMulti(eles);
							mining.utils.serverLog(34);//用户行为记录
						}else if(param == 'special'){
							collapseEvent();
							mining.utils.serverLog(35);//用户行为记录
						}else{
							mining.utils.modalLoading();
							$.each(eles, function(i,n){
								var data = n.data().data;
								setTimeout(function(){
									expandEvent(data, param == 'all' ? [] : [param]);
								},300);
							});
							mining.utils.serverLog(33);//用户行为记录
						}
					},
					/* 关系推演 */
					//直接推演+条件推演
					'expand-relation': function($node){
						var param = $node.attr('param'),
							vids = [],
							labels = [];
						
						$.each(graph.nodes('node.entity:selected'), function(i,n){
							vids.push(n.data().id);
						});
						if(vids.length < 2)return;
						if(param != 'special'){
							expandRelation(vids, []);
							mining.utils.serverLog(36);//用户行为记录
						}else{
							expandRelationMulti(vids);
							mining.utils.serverLog(37);//用户行为记录
						}
					},
					/* 显示 */
					//图析
					'view-graph': function(){
						graphTransfer('graph');
					},
					//地图
					'view-map': function(){
						graphTransfer('map');
						mining.utils.serverLog(38);//用户行为记录
					},
					//话单
					'view-ticket': function(){
						graphTransferTicket();
						mining.utils.serverLog(39);//用户行为记录
					},
					//档案
					'view-file': function(){
						graphTransfer('file');
						mining.utils.serverLog(40);//用户行为记录
					},
					/* 选中 */
					'select': function(){
						graphModule.refresh();
					},
					/* 便签 */
					'notes': function(){
						var eles = graph.nodes('.entity:selected');
						
						if(eles.length < 1)return;
						if(eles.length == 1){
							var data = eles.data().data;
							if(!data.noted){
								notesModule.add({
									gid: data.gid,
									element: eles,
									etype: 'node'
								});
								mining.utils.serverLog(41,'添加便签：' + eles.data().name);//用户行为记录
							}else{
								mining.utils.modalLoading();
								notesModule.show({
									gid: data.gid,
									element: eles,
									etype: 'node'
								});
								mining.utils.serverLog(41,'查看便签：' + eles.data().name);//用户行为记录
							}
						}else{
							mining.utils.modalLoading();
							$.each(eles, function(i,n){
								var data = n.data().data;
								if(!data.noted)return;
								setTimeout(function(){
									notesModule.show({
										gid: data.gid,
										element: n,
										etype: 'node'
									});
								},300);
								mining.utils.serverLog(41,'查看便签：' + n.data().name);//用户行为记录
							});
						}
						setTimeout(function(){
							mining.utils.modalLoading('close');
						}, eles.length * 300);
					},
					/* 删除 */
					'delete': function(){
						graphModule.delelements(':selected');
						mining.utils.serverLog(42);//用户行为记录
					},
					/* 反向删除 */
					'delete-other': function(){
						if(graph.$(':selected').size() < 1)return;
						graphModule.delelements(':unselected');
						mining.utils.serverLog(43);//用户行为记录
					},
					/* 事件对比 */
					'compare-event': function(){
						compareEvent();
						mining.utils.serverLog(44);//用户行为记录
					}
				}
			});
		});
		
		//获取事件碰撞列表
		$ajax.ajax({
			url: requestUrl.getrule,
			success: function(data){
				$.each(data.listObj, function(i,n){
					ruleList.push(n.name);
				})
			},
			error: function(data){
				seajs.log(data);
			}
		})
	}
    
    var rebuildMenu = function($menu){
    	var entitys = graph.nodes('.entity:selected');
    	$menu.find('[action][param]').not($menu.find('[action][param=all],[action][param=more],[action][param=special]')).each(function(){
    		$(this).parent().remove();
    	});
		if(entitys.length > 0){
			var menus = mining.mappingutils.getMenu(entitys.data().data);
			
			if(graph.$('.entity.person:selected').length > 0)$menu.find('[action=expand-entity][param=all]').parents('li:first').after('<li><a href="javascript:;" action="expand-entity" param="harts"><span>隐性关系</span></a></li>');
			$.each(menus, function(i,n){
				var $submenu = $menu.find('[action=expand-' + i + '][param=all]').parents('ul');
				$.each(n, function(j,m){
					$submenu.append('<li><a href="javascript:;" action="expand-' + i + '" param="' + m.name + '"><span>' + m.label + '</span></a></li>');
					if($('[param=more]',$submenu).size() > 0)$('[param=more]',$submenu).parent().appendTo($submenu);
					if($('[param=special]',$submenu).size() > 0)$('[param=special]',$submenu).parent().appendTo($submenu);
				});
			});
			if(graph.$('.entity.phoneNO:selected').length < 1){
				$menu.find('[action=view-ticket]').parent().remove()
			}else if($('[action=view-ticket]',$menu).size() < 1){
				$menu.find('[action=view-map]').parent().after('<li><a href="javascript:;" action="view-ticket"><span>话单</span></a></li>');
			}
			
			//便签
			var nodetxt = '查看便签';
			if(entitys.length > 0){
				var hasnoded = false;
				$.each(entitys, function(i,n){
					var data = n.data().data;
					if(!data.noted)return;
					hasnoded = true;
					return false;
				});
				if(!hasnoded)nodetxt = '添加便签';
			}else{
				if(!entitys.data().data.noted)nodetxt = '添加便签';
			}
			$menu.find('[action=notes] .text').text(nodetxt);
			formatSubMenu();
		}
    }
    
    var formatSubMenu = function(){
    	$('.graphmenu .graphmenu-sub').each(function(i){
			var rotate_li = 90, 
				a = 30, 
				skew = 60,
				rotate_self = (i * 45 - $(this).find('li').size() * 30 / 2);
				
			$(this).find('li').each(function(j){
				$(this).transform('rotate(' + (rotate_li + (j * a )) + 'deg) skew(' + skew + 'deg)');
				$(this).find('span').transform('rotate('+ -(100 + rotate_self - rotate_li + (j * a )) +'deg)');
				if($(this).find('span').text().length > 4)$(this).find('span').width(52);
			});
			$(this).transform('rotate(' + rotate_self + 'deg)');
		});
    }
    
	/* 键盘操作 */
	$(document).off('keydown.graphmenu').on('keydown.graphmenu', function(e){
		if(e.keyCode == mining.keyCode.DELETE && $('.page-graph .breadnav-graph').hasClass('active')){
			graphModule.delelements(':selected');
			eventModule.delelements(':selected');
		}
	});
    
    //实体扩展
	var expandEntity = function(data, labels, starttime, endtime, keyword, isMulti){
		console.time('***ExpandEntity');
		var classList = mining.mappingutils.getClassList('relation'), labelAndProp = {}, ruleIdArr = [];
		
		labels = labels || [];
		starttime = starttime || '';
		endtime = endtime || '';
		keyword = keyword || '';
		isMulti = isMulti || false;
		
		if(mining.utils.isEmpty(labels)){
			labels = [];
			$.each(classList, function(i,n){
				labels.push(n.label);
			});
		}
		$.each(labels, function(i,n){
			var _type = classList[n].children[0].type;
			labelAndProp[n] = mining.mapping.objList[n + (mining.utils.isEmpty(_type) ? '' : '_' + _type)].timeline;
		});
		if(secondExpanding){
			return;
		}
		if(labels.indexOf('harts') != -1){
			ruleIdArr = mining.mappingutils.getRuleIds();
		}
		try{clearTimeout(loadtimer);}catch(e){}
		loadtimer = setTimeout(mining.utils.modalLoading,loadtimegap);
		console.time('ajax-getEntityData');
		$ajax.ajax({
			url: requestUrl.getByLabel,
			data: {
				vid: data.gid,
				labels: JSON.stringify(labelAndProp),
				starttime: starttime,
				endtime: endtime,
				rule_ids: JSON.stringify(ruleIdArr),
				keyword: keyword
			},
			type: 'get',
			success: function(result){
				console.timeEnd('ajax-getEntityData');
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				if(mining.utils.isEmpty(result)){
					$dialog.alert('未找到任何数据！', 'warning');
					return;
				}
				graphModule.appenddata(result);
				if(isMulti)return;
				setTimeout(function(){
					var node = graph.$('#' + data.gid), 
						nodedata = node.data().data;
					
					if(nodedata.label != 'person') return;
					$.each(node.neighborhood('.entity'), function(i,n){
						var _data = n.data().data;
						if(n.hasClass('entity') && (/*_data.label == 'vehicle' ||*/ _data.label == 'case' || (_data.label == 'household' && _data.type != 'community_household'))){
							expandEntity(_data);
						}
					});
					secondExpanding = true;
				},300);
			},
			error: function(result){
				console.timeEnd('ajax-getEntityData');
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
			}
		});
	}
	var expandEntityMulti = function(eles){
		$dialog({
			title: '条件扩展',
			width: 530,
			onshow: function(){
				var $dlg = this, 
					$node = $(this.node),
					classList = mining.mappingutils.getClassList('relation'),
					tmpl = '';
				
				$('.main').addClass('blur');//添加背景模糊效果
				
				tmpl += '<div class="col-sm-6"><a class="chooseall" href="javascript:;" style="color:#707070;"><span class="checkbox"></span>全部</a></div>'
				$.each(classList, function(i,n){
					tmpl += '<div class="col-sm-6"><a class="chooselabel" href="javascript:;" label="' + n.label + '" style="color:#707070;"><span class="checkbox"></span>' + n.label_name + '</a></div>'
				});
				$dlg.content(['<form class="form-horizontal required-validate" onsubmit="return false;">',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">关系类型</label>',
		    	    	'<div class="col-sm-9">' + tmpl + '</div>',
		    	  	'</div>',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">时间范围</label>',
		    	    	'<div class="col-sm-9">',
		    	    		'<input type="text" name="timerange" class="form-control" placeholder="请选择...">',
		    	    	'</div>',
		    	  	'</div>',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">关键字</label>',
		    	    	'<div class="col-sm-9">',
		    	    		'<input type="text" name="keyword" class="form-control" placeholder="请填写...">',
		    	    	'</div>',
		    	  	'</div>',
				'</form>'].join(''));
				$('.chooselabel',$node).on('click', function(){
					var $this = $(this);
					
					$this.add($('.checkbox',$this)).toggleClass('active');
				});
				$('.chooseall',$node).on('click', function(){
					var $this = $(this);
					
					$this.toggleClass('active');
					if($this.hasClass('active')){
						$('.chooselabel,.checkbox',$node).addClass('active');
					}else{
						$('.chooselabel,.checkbox',$node).removeClass('active');
					}
				});
				$('[name=timerange]',$node).daterangepicker({
					timePicker: true,
					timePicker12Hour: false,
					timePickerIncrement: 1,
					showDropdowns: true,
					format: 'YYYY-MM-DD HH:mm:ss',
					applyClass: 'btn-primary',
		       	 	clearClass: 'btn-primary'
				}).on('clear.daterangepicker', function(){
					$(this).val('');
				});
			},
			okValue: '确定',
			ok: function(){
				var $dlg = this, 
					$node = $(this.node),
					labelArr = [],
					timerange = $('[name=timerange]',$node).val().split(' 至 '),
					keyword = $('[name=keyword]',$node).val();
				
				$('.chooselabel.active',$node).each(function(){
					labelArr.push($(this).attr('label'));
				});
				if(labelArr.length < 1){
					$('.chooselabel',$node).each(function(){
						labelArr.push($(this).attr('label'));
					});
				}
				if(timerange.length < 2) timerange = ['',''];
				
				if(!mining.utils.isEmpty(labelArr)){
					$.each(eles, function(i,n){
						var data = n.data().data;
						setTimeout(function(){
							expandEntity(data, labelArr, timerange[0], timerange[1], keyword, true);
						},300);
					});
				}
			},
			cancelValue: '取消',
			cancel: true,
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
		}).showModal();
	}
	
	//事件扩展
	var expandEvent = function(data, labels, starttime, endtime, keyword){
		console.time('***ExpandEvent');
		var keyprop = mining.mappingutils.getProperties(data, 'key');
		
		labels = labels || [];
		starttime = starttime || '';
		endtime = endtime || '';
		keyword = keyword || '';
		
		if(mining.utils.isEmpty(labels)){
			labels = mining.mappingutils.getLabels('event');
		}
		try{clearTimeout(loadtimer);}catch(e){}
		loadtimer = setTimeout(mining.utils.modalLoading,loadtimegap);
		console.time('ajax-getEventData');
		/*try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
		eventModule.appenddata(data, require('./events').bodyData);
		return;*/
		$ajax.ajax({
			url: requestUrl.getEvents,
			data: {
				objId: keyprop.value,
				types: JSON.stringify(labels),
				starttime: starttime,
				endtime: endtime,
				keyword: keyword
			},
			success: function(result){
				console.timeEnd('ajax-getEventData');
				if(mining.utils.isEmpty(result.bodyData)){
					try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
					$dialog.alert('未找到任何数据！', 'warning');
					return;
				}
				eventModule.appenddata(data, result.bodyData);
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				//graphModule.appenddata(mining.utils.frmatEventData(data, result.bodyData));
			},
			error: function(result){
				console.timeEnd('ajax-getEventData');
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
			}
		});
	}
	
	var expandEventMulti = function(eles){
		$dialog({
			title: '条件扩展',
			width: 530,
			onshow: function(){
				var $dlg = this, 
					$node = $(this.node),
					classList = mining.mappingutils.getClassList('event'),
					tmpl = '';
				
				$('.main').addClass('blur');//添加背景模糊效果
				
				tmpl += '<div class="col-sm-6"><a class="chooseall" href="javascript:;" style="color:#707070;"><span class="checkbox"></span>全部</a></div>';
				$.each(classList, function(i,n){
					tmpl += '<div class="col-sm-6"><a class="chooselabel" href="javascript:;" label="' + n.label + '" style="color:#707070;"><span class="checkbox"></span>' + n.label_name + '</a></div>'
				});
				$dlg.content(['<form class="form-horizontal required-validate" onsubmit="return false;">',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">关系类型</label>',
		    	    	'<div class="col-sm-9">' + tmpl + '</div>',
		    	  	'</div>',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">时间范围</label>',
		    	    	'<div class="col-sm-9">',
		    	    		'<input type="text" name="timerange" class="form-control" placeholder="请选择...">',
		    	    	'</div>',
		    	  	'</div>',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">关键字</label>',
		    	    	'<div class="col-sm-9">',
		    	    		'<input type="text" name="keyword" class="form-control" placeholder="请填写...">',
		    	    	'</div>',
		    	  	'</div>',
				'</form>'].join(''));
				$('.chooselabel',$node).on('click', function(){
					var $this = $(this);
					
					$this.add($('.checkbox',$this)).toggleClass('active');
				});
				$('.chooseall',$node).on('click', function(){
					var $this = $(this);
					
					$this.toggleClass('active');
					if($this.hasClass('active')){
						$('.chooselabel,.checkbox',$node).addClass('active');
					}else{
						$('.chooselabel,.checkbox',$node).removeClass('active');
					}
				});
				$('[name=timerange]',$node).daterangepicker({
					timePicker: true,
					timePicker12Hour: false,
					showDropdowns: true,
					timePickerIncrement: 1,
					format: 'YYYY-MM-DD HH:mm:ss',
					applyClass: 'btn-primary',
		       	 	clearClass: 'btn-primary'
				}).on('clear.daterangepicker', function(){
					$(this).val('');
				});
			},
			okValue: '确定',
			ok: function(){
				var $dlg = this, 
					$node = $(this.node),
					labelArr = [],
					timerange = $('[name=timerange]',$node).val().split(' 至 '),
					keyword = $('[name=keyword]',$node).val();
				
				$('.chooselabel.active',$node).each(function(){
					labelArr.push($(this).attr('label'));
				});
				if(labelArr.length < 1){
					$('.chooselabel',$node).each(function(){
						labelArr.push($(this).attr('label'));
					});
				}
				if(timerange.length < 2) timerange = ['',''];
				
				if(!mining.utils.isEmpty(labelArr)){
					$.each(eles, function(i,n){
						var data = n.data().data;
						setTimeout(function(){
							expandEvent(data, labelArr, timerange[0], timerange[1], keyword);
						},300);
					});
				}
			},
			cancelValue: '取消',
			cancel: true,
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
		}).showModal();
	}
	var collapseEntity = function(eles){
		graphModule.closeentity(eles);
	}
	var collapseEvent = function(){
		var entityArr = [];
		
		$.each(graph.$('.entity:selected'), function(i,n){
			entityArr.push(n.data().data);
		});
		eventModule.closeevent(entityArr);
	}
	
	//直接推演
	var expandRelation = function(vids, labels, hop, keyword, notip){
		labels = labels || [];
		hop = hop || 4;
		keyword = keyword || '';
		notip = notip || false;
		
		if(mining.utils.isEmpty(labels)){
			labels = mining.mappingutils.getLabels('relation');
		}
		try{clearTimeout(loadtimer);}catch(e){}
		loadtimer = setTimeout(mining.utils.modalLoading,loadtimegap);
		console.time('ajax-getRelationData');
		$ajax.ajax({
			url: requestUrl.getPath,
			data: {
				vids: JSON.stringify(vids),
				labels: JSON.stringify(labels),
				hop: hop,
				keyword: keyword
			},
			success: function(result){
				console.timeEnd('ajax-getRelationData');
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				if((mining.utils.isEmpty(result) || mining.utils.isEmpty(result.v)) && !notip){
					$dialog.alert('未找到任何数据！', 'warning');
					return;
				}
				graphModule.appenddata(result);
			},
			error: function(result){
				console.timeEnd('ajax-getRelationData');
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				if(!notip)mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
			}
		});
	}
	var expandRelationMulti = function(vids){
		$dialog({
			title: '条件推演',
			width: 530,
			onshow: function(){
				var $dlg = this, 
					$node = $(this.node),
					classList = mining.mappingutils.getClassList('relation'),
					tmpl = '';
				
				$('.main').addClass('blur');//添加背景模糊效果
				
				tmpl += '<div class="col-sm-6"><a class="chooseall" href="javascript:;" style="color:#707070;"><span class="checkbox"></span>全部</a></div>';
				$.each(classList, function(i,n){
					tmpl += '<div class="col-sm-6"><a class="chooselabel" href="javascript:;" label="' + n.label + '" style="color:#707070;"><span class="checkbox"></span>' + n.label_name + '</a></div>'
				});
				
				
				$dlg.content(['<form class="form-horizontal required-validate" onsubmit="return false;">',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">关系类型</label>',
		    	    	'<div class="col-sm-9">' + tmpl + '</div>',
		    	  	'</div>',
		    	  	'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">推演跳数</label>',
		    	    	'<div class="col-sm-9">',
		    	    		'<select name="hop" style="width:100%;">',
		    	    			'<option>1</option>',
		    	    			'<option>2</option>',
		    	    			'<option selected="selected">3</option>',
		    	    			'<option>4</option>',
		    	    		'</select>',
		    	    	'</div>',
		    	  	'</div>',
		    	  	'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">关键字</label>',
		    	    	'<div class="col-sm-9">',
		    	    		'<input type="text" name="keyword" class="form-control" placeholder="请填写...">',
		    	    	'</div>',
		    	  	'</div>',
				'</form>'].join(''));
				$('.chooselabel',$node).on('click', function(){
					var $this = $(this);
					
					$this.add($('.checkbox',$this)).toggleClass('active');
				});
				$('.chooseall',$node).on('click', function(){
					var $this = $(this);
					
					$this.toggleClass('active');
					if($this.hasClass('active')){
						$('.chooselabel,.checkbox',$node).addClass('active');
					}else{
						$('.chooselabel,.checkbox',$node).removeClass('active');
					}
				});
				$('select',$node).select2();
			},
			okValue: '确定',
			ok: function(){
				var $dlg = this, 
					$node = $(this.node),
					hop = $('[name=hop]',$node).val(),
					labelArr = [],
					keyword = $('[name=keyword]',$node).val();
				
				$('.chooselabel.active',$node).each(function(){
					labelArr.push($(this).attr('label'));
				});
				if(labelArr.length < 1){
					$('.chooselabel',$node).each(function(){
						labelArr.push($(this).attr('label'));
					});
				}
				if(labelArr.length == $('.chooselabel',$node).size())labelArr = [];
				expandRelation(vids, labelArr, hop, keyword);
			},
			cancelValue: '取消',
			cancel: true,
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
		}).showModal();
	}
	
	//事件对比
	var compareEvent = function(){
		var ids = [], events = [], entityArr = [];
						
		$.each(graph.$('node.event:selected'), function(i,n){
			events.push(n.data().data);	
		});
		$.each(graph.$('node.entity:selected'), function(i,n){
			var _data = n.data().data;
			ids.push(mining.mappingutils.getProperties(_data, 'key').value);	
			entityArr.push(_data);
		});
		try{clearTimeout(loadtimer);}catch(e){}
		loadtimer = setTimeout(mining.utils.modalLoading,loadtimegap);
		$ajax.ajax({
		    url: requestUrl.merge,
		    type: "POST",
		    data: {
				ids: JSON.stringify(ids),
				events: JSON.stringify(events),
				rules: JSON.stringify(ruleList)
			},
			success: function(result){
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				var data = {
					e: result.hits.events, 
					v: result.v, 
					hits: {
						events: result.e,
						pairs: result.hits.pairs
					}
				}
				if(!data.hits.pairs && result.hits.length){
					data.e = result.hits[0].events;
					data.hits.pairs = result.hits[0].pairs;
				}
				if(mining.utils.isEmpty(data.hits.pairs) && mining.utils.isEmpty(data.e)){
					$dialog.alert('未找到任何数据！', 'warning');
					return;
				}
				graphModule.appenddata(mining.utils.frmatMergeData(data));
				eventModule.appenddata(entityArr, data.hits.events, data.v);
			},
			error: function(result){
				try{clearTimeout(loadtimer);mining.utils.modalLoading('close');}catch(e){}
				mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
			}
		});
	}
		
    //显示到指定nav
    var graphTransfer = function(nav){
    	var snapshotName = '',
    		transferDataArr = [],
    		snapshotData, 
    		tabType = 1;
    	
    	$.each(graph.$('node.entity:selected,node.event:selected'), function(i,n){
    		var _d = mining.utils.clone(n.data().data);
    		_d.locked = false;
			transferDataArr.push(_d);
		});
    	$.each(graph.$('edge.relation:selected'), function(i,n){
			transferDataArr.push($.extend(n.data().data, {source: n.source().data().data, target: n.target().data().data}));
		});
		/*$.each(graph.$('node.event:selected'), function(i,n){
			var _d = mining.utils.clone(n.data().data),
				_d2 = mining.utils.clone(n.connectedEdges('.event').connectedNodes('.entity').data().data);
				
    		_d.locked = false;
    		_d2.locked = false;
			transferDataArr.push($.extend(_d, {entity: _d2}));
		});*/
		switch(nav){
			case 'map': 
				snapshotName = mining.localname.mapSnapshot;
				snapshotData = mining.utils.localStorage(snapshotName) || [];
				break;
			case 'file': 
				snapshotName = mining.localname.fileSnapshot;
				snapshotData = [];
				/*var emptyData = {current:'', navtabs:[], filelist:[], filedata:[]};
				snapshotName = mining.localname.fileSnapshot;
				snapshotData = mining.utils.localStorage(snapshotName) || emptyData;
				if(mining.utils.isEmpty(snapshotData))snapshotData = emptyData;
				snapshotData.current = transferDataArr[0].gid;
				// if(!snapshotData.filelist) snapshotData.filelist = [];
				snapshotData.filelist = [];
				if(!snapshotData.navtabs) snapshotData.navtabs = [];
				if(!snapshotData.filedata) snapshotData.filedata = [];
				if(snapshotData.filedata.length > 0){
					var filedataArr = [].concat(snapshotData.filedata);
					$.each(filedataArr,function(k,v){
						if($.inArray(v.gid, snapshotData.navtabs) < 0){
							snapshotData.filedata.remove(v);
						}
					});
				}*/
				break;
		}
		$.each(transferDataArr, function(i,n){
			if(nav == 'file'){
				/*if(!n.etype)n.etype = mining.mappingutils.getType(n);
				if(typeof n.locked != 'undefined')delete n.locked;
				if(n.label == 'doc' || (n.label == 'media' && n.type == 'doc')){
					snapshotData.navtabs.pushOnly(n.gid);
				}else{
					snapshotData.filelist.pushOnly(n.gid);
				}
				snapshotData.filedata.pushOnly(n);*/
				if(!n.etype)n.etype = mining.mappingutils.getType(n);
				if(typeof n.locked != 'undefined')delete n.locked;
				if(n.label == 'doc' || (n.label == 'media' && n.type == 'doc')){
					tabType = 3;
				}
				snapshotData.push(n);
			}else{
				snapshotData.pushOnly(n);
			}
		});
		//if(nav == 'file')snapshotData.current = transferDataArr[0].gid;
		if(nav == 'file'){
			mining.utils.updateFileData('add', {dataArr:snapshotData, tabType:tabType});
		}else{
			mining.utils.localStorage(snapshotName, snapshotData);
		}
		mining.utils.hashChange(nav);
    }
    
    var graphTransferTicket = function(){
    	var phoneArr = [];
    	
    	$.each(graph.$('node.entity:selected'), function(i,n){
    		var data = n.data().data;
    			
    		if(data.label == 'phoneNO'){
    			phoneArr.pushOnly(data.key);
    		}
		});
		mining.utils.judgedDataByPhones(phoneArr);
    }
    
    return {
    	init: initMenu,
    	expandRelation: expandRelation
    }
    
});
