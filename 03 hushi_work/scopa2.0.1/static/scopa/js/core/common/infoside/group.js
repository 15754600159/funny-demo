define(function(require, exports, module){
	
	/**
     * @name Group
     * @class 右侧统计功能。
     */
    var defaultConfig = {
	    	graph: null,
	    	container: null
	    };
    
    
    module.exports = function(){
    	var graph = null,
    		eventModule = eventModule,
		    selection = null,
		    eventarr = null,
		    selection2 = null,
		    $info, $group;
		    
    	/* 初始化统计 */
		var initGroup = function(config){
			config = $.extend({}, defaultConfig, config);
			graph = config.graph;
			eventModule = config.eventModule;
			$info = config.container;
			$group = $('.info-group',$info);
			selection = config.selection || [];
			eventarr = config.eventarr || [];
			
			if(mining.utils.isEmpty(graph) || $info.size() < 1 || $group.size() < 1) return;
			
			$('.infolistcontent',$group).mCustomScrollbar({
				theme:"minimal"         
			});
			initEvent();
			refreshGroup();
		}
		
		/* 初始化事件 */
		var initEvent = function(){
			$group.off('click', '.groupitem[label]').on('click', '.groupitem[label]', function(){
				$(this).toggleClass('active');
				scopa_infosideaction = true;
				var classes = {select:[], unselect:[]};
				$('.groupitem[label]',$group).each(function(){
					var $this = $(this), selector = '.' + $this.attr('label');
					
					try{
						if(selector.indexOf('harts') != -1){
							var ruleId = selector.split('_')[1],
								hartsidArr = [];
							
							$.each(selection.filter('.harts.relation'), function(i,n){
								mining.mappingutils.setRuleIds(n);//harts边rule_ids为空时的处理 TODO
								var _rid = n.data().data.rule_ids;
								
								if(!mining.utils.isEmpty(_rid) && _rid.split(';').indexOf(ruleId) != -1){
									hartsidArr.push('#' + n.id())
								}
							})
							selector = hartsidArr.join(',')
						}
					}catch(e){}
					if(mining.utils.isEmpty(selector))return;
					if($this.hasClass('active')){
						classes.select.pushOnly(selector);
					}else{
						classes.unselect.pushOnly(selector);
					}
				});
				if(classes.unselect.length > 0){
					try{
						selection.filter(classes.unselect.join(',')).unselect();
						$.each(classes.unselect, function(i,n){
							$('.eventlistdlg .eventlist tr[objname=' + n.replace('.','') + ']').removeClass('active');
						})
					}catch(e){
						$.each(selection, function(i,n){
							$.each(classes.unselect, function(k,m){
								if(n.hasClass(m))n.unselect();
								$('.eventlistdlg .eventlist tr[objname=' + m.replace('.','') + ']').removeClass('active');
							});
						});
					}
				}
				if(classes.select.length > 0){
					try{
						selection.filter(classes.select.join(',')).select();
						$.each(classes.select, function(i,n){
							$('.eventlistdlg .eventlist tr[objname=' + n.replace('.','') + ']').addClass('active');
						})
					}catch(e){
						$.each(selection, function(i,n){
							$.each(classes.select, function(k,m){
								if(n.hasClass(m))n.select();
								$('.eventlistdlg .eventlist tr[objname=' + m.replace('.','') + ']').addClass('active');
							});
						});
					}
				}
				if(classes.select.length < 1 && classes.unselect.length < 1){
					try{
						selection.unselect();
						selection2 = selection;
					}catch(e){
						$.each(selection, function(i,n){
							n.unselect();
						});
						selection2 = mining.utils.clone(selection);
					}
				}else{
					try{
						selection2 = selection.filter(':selected');
					}catch(e){
						selection2 = [];
						$.each(selection, function(i,n){
							if(n.selected)selection2.push(n);
						});
					}
				}
				refreshPropertyList();
				if($('.page-graph .breadnav-graph').hasClass('active')){
					mining.utils.serverLog(50, $(this).find('.name').attr('title'));//用户行为记录
				}else if($('.page-map .breadnav-map').hasClass('active')){
					mining.utils.serverLog(70, $(this).find('.name').attr('title'));//用户行为记录
				}
			});
			$group.off('click', '.groupitem[property]').on('click', '.groupitem[property]', function(){
				var elements = {select:[], unselect:[]};
				
				$(this).toggleClass('active');
				scopa_infosideaction = true;
				$('.groupitem[property]',$group).each(function(){
					var $this = $(this), ids = $(this).data('data');
					
					if($this.hasClass('active')){
						elements.select = elements.select.concat(ids);
					}else{
						elements.unselect = elements.unselect.concat(ids);
					}
				});
				
				var arr = [];
				
				$.each(elements.unselect, function(i,n){
					if(elements.select.indexOf(n) == -1) arr.push(n);
				});
				if(arr.length > 0){
					try{
						selection2.filter(arr.join(',')).unselect();
					}catch(e){
						$.each(selection2, function(i,n){
							$.each(arr, function(k,m){
								if(n.data().data.gid == m.replace('#',''))n.unselect();
							});
						});
					}
				}
				if(elements.select.length > 0){
					try{
						selection2.filter(elements.select.join(',')).select();
					}catch(e){
						$.each(selection2, function(i,n){
							$.each(elements.select, function(k,m){
								if(n.data().data.gid == m.replace('#',''))n.select();
							});
						});
					}
				}
				if(elements.select.length < 1 && arr.length < 1){
					try{
						selection2.unselect();
					}catch(e){
						$.each(selection2, function(i,n){
							n.unselect();
						});
					}
				}
				if($('.page-graph .breadnav-graph').hasClass('active')){
					mining.utils.serverLog(50, $(this).find('.name').attr('title'));//用户行为记录
				}else if($('.page-map .breadnav-map').hasClass('active')){
					mining.utils.serverLog(70, $(this).find('.name').attr('title'));//用户行为记录
				}
			});
		}
		
		/* 刷新数据 */
		var refreshGroup = function(){
			var objList = mining.mappingutils.getTypeList(),
				groupArr = {entity:[], relation:[], event:[]},
				propertyList = {},
				eventselected = '';
			
			$('.grouplist',$group).empty();
			if(mining.utils.isEmpty(selection) && eventarr.length < 1)return;
			
			if(eventModule){
				eventselected = eventModule.getdata(':selected').length > 0 ? ':selected' : '';
				if(mining.utils.isEmpty(eventarr))eventarr = eventModule.getdata(eventselected);
			}
			$.each(objList, function(i,n){
				var type = mining.mappingutils.getType(i), 
					count = total = 0,
					selector = '.' + i + '.' + type;

				try{
					/*count = selection.filterFn(function(ele){
						return mining.mappingutils.getName(ele.data().data) == i && ele.hasClass(i) && ele.hasClass(type) && (type == 'event' ? ele.isNode() : true);
					}).length;*/
					count = selection.filter(selector).length;
					total = selection.filter('.' + type).length;
					if(type == 'event' && eventModule){
						//total = selection.filter('node.' + type).length;
						count = eventModule.getdata(i, eventselected).length;
						total = eventarr.length;
					}else if(i == 'harts'){
						var hartsEdge = {}
						$.each(selection.filter(selector), function(j,m){
							var typelist = mining.mappingutils.getHartsList(m.data().data);
							$.each(typelist, function(k,o){
								if(!hartsEdge[o.label]){
									hartsEdge[o.label] = {
										count: 0,
										label: o.label,
										name: o.name
									}
								}
								hartsEdge[o.label].count ++;
							});
							
						});
						$.each(hartsEdge, function(i,n){
							groupArr[type].push({labelname:n.label, name:n.name, count:n.count, total:total});
						})
						return;
					}
				}catch(e){
					if(type == 'event' && eventModule){
						count = eventModule.getdata(i, eventselected).length;
						total = eventarr.length;
					}else{
						$.each(selection, function(k,m){
							if(mining.mappingutils.getName(m.data().data) == i && m.hasClass(type)){
								count++;
							}
							if(m.hasClass(type)){
								total++;
							}
						});
					}
				}
					
				if(count < 1)return;
				groupArr[type].push({labelname:i, name:n, count:count, total:total});
			});
			var groupTmpl = {};
			$.each(groupArr, function(i,n){
				if(n.length < 1)return;
				n.sort(function(a,b){return a.count < b.count ? 1 : -1});
				$.each(n, function(j,m){
					var _persent = ((m.count / m.total) * 150).toFixed(2),
						namelabel = m.name,
						pertmpl = parseFloat((_persent * 100 / 150).toFixed(2)) + '%"',
						bartitle = ' title="' + namelabel + '：' + pertmpl;
					
					if(!groupTmpl[i])groupTmpl[i] = [];
					groupTmpl[i].push(['<div class="groupitem" label="' + m.labelname + '"' + bartitle + '>',
						'<div class="name" title="' + namelabel + '">' + namelabel + '</div>',
						'<div class="count">' + m.count + '</div>',
						'<div class="percentbar" style="width:' + _persent + 'px;"></div>',
					'</div>'].join(''));
				});
			});
			$.each(groupTmpl, function(i,n){
				$('.group-' + i + ' .grouplist',$group).append(n.join(''));
			});
			resetHeight();
			refreshPropertyList();
		}
		
		/* 重置属性类别 */
		var refreshPropertyList = function(){
			var propertyList = {};
			
			//获取实体、关系、事件被选中类型
			$.each($('.groupitem.active[label]',$group), function(i,n){
				var label = $(this).attr('label'),
					groupByProperty = mining.mappingutils.getGroupBy(label);
				
				$.each(groupByProperty, function(k,o){
					propertyList[label + o] = {
						label: label,
						property: o,
						list: []
					};
				});
			});
			
			$('.title[property],.grouplist[property]',$group).remove();
			
			$.each(selection, function(i,n){
				var data = n.data().data, 
					label = mining.mappingutils.getName(data),
					label_name = mining.mappingutils.getLabelName(data),
					type_name = mining.mappingutils.getTypeName(data);
				
				$.each(data, function(j,m){
					var _arr = propertyList[label + j], 
						name = m,
						_has = false;
						
					if(mining.utils.isEmpty(_arr)) return;
					if(j == 'label'){
						name = label_name;
					}else if(j == 'type'){
						name = type_name;
					}
					$.each(_arr.list, function(k,o){
						if(o.name == name){
							o.ids.pushOnly('#' + n.data().id);
							o.count++;
							_has = true;
							return false;
						}
					});
					if(!_has)_arr.list.push({
						ids: ['#' + n.data().id],
						name: name,
						count: 1
					});
				});
			});
			
			$.each(propertyList, function(i,n){
				var _property = mining.mappingutils.getPropLabel(n.property),
					_$list = $('.grouplist[property="' + n.property + '"]',$group);
				
				if(mining.utils.isEmpty(_property) || n.list.length < 1) return;
				
				if(_$list.size() < 1){
					$('.propertylist',$group).append(['<div class="title nopadding" property="' + n.property + '"><span class="text">' + _property + '</span></div>',
							'<div class="grouplist" property="' + n.property + '" count="0"></div>'].join(''));
					_$list = $('.grouplist[property="' + n.property + '"]',$group);
				}
				$.each(n.list, function(j,m){
					var _$item = $('[property="' + m.name + '"]',_$list);
					
					_$list.attr('count', parseInt(_$list.attr('count')) + m.count);
					if(_$item.size() > 0){
						$('.count',_$item).text(parseInt($('.count',_$item).text()) + m.count);
						var _ids = _$item.data('data');
						$.each(m.ids, function(k,o){
							_ids.pushOnly(o);
						});
						_$item.data('data', _ids);
						return;
					}
					_$list.append(['<div class="groupitem" property="' + m.name + '">',
						'<div class="name" title="' + m.name + '">' + m.name + '</div>',
						'<div class="count">' + m.count + '</div>',
						'<div class="percentbar" style="width:1px;"></div>',
					'</div>'].join('')).find('.groupitem:last').data('data', m.ids);
				});
			});
			$('.propertylist .groupitem',$group).each(function(){
				var $this = $(this),
					_total = parseInt($this.parent().attr('count')),
					_count = parseInt($('.count',$this).text()),
					_persent = ((_count / _total) * 150).toFixed(2),
					pertmpl = parseFloat((_persent * 100 / 150).toFixed(2)) + '%'
					bartitle = $('.name',$this).attr('title') + '：' + pertmpl;
					
				$('.percentbar',$this).css('width', _persent + 'px').parent().attr('title', bartitle);
				
				//冒泡排序
				$.each($this.nextAll(), function(i,n){
					var _$next = $(this);
					if(_count < parseInt($('.count',_$next).text()))_$next.insertBefore($this);
				});
			});
			resetHeight();
		}
		
		/* 重置列表高度 */
		var resetHeight = function(){
			var infoH = $info.height(),
				h = (infoH - 40 - 32 * 4 - 100) / 4, 
				hgap = 0,
				hadd = $('.infolistcontent',$group).size();
			$('.infolistcontent',$group).css('height', 'auto').each(function(){
				var _h = $(this).height();
				
				if(_h < h){
					hgap += (h - _h);
					hadd--;
				}
			});
			var _height = h + hgap / hadd;
			$('.infolistcontent',$group).each(function(){
				if($(this).height() > _height)$(this).height(_height)
			});
		}
		
		
		return {
			init: initGroup
		}
    }
});