define(function(require, exports, module){
	
	/**
     * @name eventChart
     * @class 提供事件弹窗展示。
     */
	
	module.exports = function(){
		var eventConfig = {
			readyCallback: null,
			selectCallback: null,
			resizeCallback: null,
			clickCallback: null,
			dblclickCallback: null,
			dataCallback: null
		},
		dlgIdArr = [],
		eventsData = {};
		
		/* 初始化图析 */
		var initEvent = function(config){
			$.extend(eventConfig, config);
		}
		
		var getDlgId = function(entity){
			return 'entityEventListDlg-'+entity.gid;
		}
		
		var getEntityId = function($dlg){
			return $dlg.id.replace('entityEventListDlg-','')
		}
		
		var getEventDlg = function(entity){
			return $dialog.get(getDlgId(entity));
		}
		
		var refreshDlg = function(){
			$.each(dlgIdArr, function(i,n){
				var $dlg = $dialog.get(n), 
					entityId = getEntityId($dlg),
					hasEntity = false;
				
				$.each(entityId.split('_'), function(i,n){
					if((dragon && dragon.$('#' + n).length > 0) || (bdmap && bdmap.$('#' + n).length > 0)){
						hasEntity = true;
						return false;
					}
				})
				if(!hasEntity)$dlg.close().remove();
			});
		}
		
		var refreshCount = function(){
			$.each(dlgIdArr, function(i,n){
				var $dlg = $dialog.get(n), 
					$node = $($dlg.node), 
					typeArr = $dlg.typeArr || [],
					countArr = [];
				
				var titleArr = [];
				$('.eventtype',$node).removeClass('active');
				$('[objname]:hidden',$node).not('.nofilter').show();
				$.each(typeArr, function(i,n){
					var _fname = mining.mappingutils.getFontName(n),
						typename = mining.mappingutils.getTypeName(n),
						count = $('[objname=' + n + ']:visible', $node).size();
					
					titleArr.push(typename + '：' + count);
					countArr.push('<span class="eventtype" type="' + n + '"  title="' + typename + '"><span class="font20 ' + mining.mappingutils.getFontName(n) + '"></span>' + count + '</span>');
				});
				$('.eventcountlist',$node).html(countArr.join('&nbsp;|&nbsp;')).attr('title', titleArr.join('；'));
				if($('[objname=phone_event_other]:visible',$node).size() < 1){
						$('.action-ticket',$node).addClass('disabled')
					}else{
						$('.action-ticket',$node).removeClass('disabled')
					}
			});
		}
		
		var toMapEvent = function(){
			if($(this).hasClass('disabled'))return;
	
			var $node = $(this).parents('.eventlistdlg:first'),
				$phonelist = $('[objname].active:visible',$node),
				snapshotName = mining.localname.mapSnapshot,
				snapshotData = mining.utils.localStorage(snapshotName) || [];

			if($phonelist.size() < 1)$phonelist = $('[objname]:visible',$node);
	    	$phonelist.each(function(){
	    		var gid = $(this).attr('gid'),
	    			data = eventsData[gid];
	    		
	    		if(data)snapshotData.push(data);
			});
			mining.utils.localStorage(snapshotName, snapshotData);
			mining.utils.hashChange('map');
		}
		
		var toTicketEvent = function(){
			if($(this).hasClass('disabled'))return;
	
			var $node = $(this).parents('.eventlistdlg:first'),
				$phonelist = $('[objname=phone_event_other].active:visible',$node),
				phoneArr = [];

			if($phonelist.size() < 1)$phonelist = $('[objname=phone_event_other]:visible',$node);
	    	$phonelist.each(function(){
	    		var gid = $(this).attr('gid'),
	    			data = eventsData[gid].key;
	    		
	    		if(data)phoneArr.pushOnly(data);
			});
			mining.utils.judgedDataByPhones(phoneArr);
		}
		
		var conuntEvent = function(){
			var $node = $(this).parents('.eventlistdlg:first');
			
			$(this).toggleClass('active');
			if($('.eventtype.active',$node).size() < 1){
				$('[objname]', $node).not('.nofilter').show();
				return;
			}
			$('.eventtype',$node).each(function(){
				var objname = $(this).attr('type'),
					$objlist = $('[objname=' + objname + ']', $node).not('.nofilter'); 
				
				if($(this).hasClass('active')){
					$objlist.show();
				}else{
					$objlist.hide();
				}
			});
		}
		
		/* 添加数据 */
		var appendData = function(entity, events, sentitys){//sentitys为小实体数据
			if(!entity || ($.isArray(entity) && entity.length < 1) || (!$.isArray(entity) && !entity.gid))return;
			
			var config = {
				gid: '',
				title: '',
				position: {x:100, y:100}
			}
			
			if($.isArray(entity)){
				var idarr = [];
				$.each(entity, function(i,n){
					idarr.push(n.gid.toString())
				});
				if(sentitys && $.isArray(sentitys)){
					var index = idarr.length;
					$.each(sentitys, function(i,n){
						idarr.pushOnly(n.gid.toString())
					});
					idarr = idarr.slice(index, idarr.length);
				}
				config.gid = idarr.join('_')
			}else{
				config.gid = entity.gid;
			}
			
			var dlgId = getDlgId(config), $dlg = getEventDlg(config);
			
			if(events.length > 500){
				mining.utils.modalLoading();
				mining.utils.loadingMsg('生成事件数据列表，请您稍等......');
			}
			if(mining.utils.isEmpty($dlg)){
				var title = '', titlearr = [], tleft = 58;
				if($.isArray(entity)){
					$.each(entity, function(i,n){
						titlearr.push(mining.mappingutils.getTitle(n))
					})
					config.title = titlearr.join(' - ');
					config.position = dragon.$('#' + entity[0].gid).position();
					title = '事件对比：'
					tleft = 82
				}else{
					var labelArr = mining.mappingutils.getShowlabel(entity, 'big');
					$.each(labelArr, function(i,n){
						titlearr.push(n.value);
					});
					config.title = titlearr.join('-');
					title = '主体：'
				}
				dlgIdArr.push(dlgId);
				$dlg = $dialog({
					id: dlgId,
					title: title,
					padding: 0,
					width: 500,
					onshow: function(){
						var $dlg = this, $node = $(this.node);
						
						$node.addClass('eventlistdlg');
						$dlg.content(['<div class="eventlistdlg">',
							'<table class="grid newtable"><thead><tr><th class="txtc" style="width:66px">类型</th><th style="width:160px">更新时间</th><th>事件描述</th></tr></thead></table>',
							'<div class="eventlist">',
								'<table class="grid newtable"><tbody></tbody></table>',
							'</div>',
							'<div class="eventcountlist"></div>',
						'</div>'].join(''));
						
						$('.artui-dialog-title',$node).append('<span class="elabel ellipsis" title="' + config.title+ '" style="left:' + tleft+ 'px">' + config.title+ '</span>')
						$('.artui-dialog-header',$node).append('<a class="actionbtn action-map" title="到地图" href="javascript:;"><span class="font20 graphicon scopaicon-daoditu"></span></a><a class="actionbtn action-ticket" title="到话单" href="javascript:;"><span class="font20 graphicon scopaicon-daohuadan20"></span></a>');
						$('.eventlist',$node).mCustomScrollbar({
	    					theme:"minimal",
	    				});
	    				if($.hash().indexOf('map') != -1)$('.action-map',$node).addClass('disabled');
	    				$node.off('click', '.action-map').on('click', '.action-map', toMapEvent);
	    				$node.off('click', '.action-ticket').on('click', '.action-ticket', toTicketEvent);
	    				$node.off('click', '.eventlist tbody tr').on('click', '.eventlist tbody tr', function(e){
							var $prevActive = $(this).prevAll('tr.active:first');
							
							$(this).toggleClass('active');
							if(e.shiftKey && $prevActive.size() > 0){
								var startindex = $prevActive.index() + 1, endindex = $(this).index();
								
								for(var i= startindex; i < endindex; i++){
									$('.eventlist tbody tr:eq(' + i +')',$node).addClass('active');
								}
								window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
							}
							if(!e.ctrlKey && !e.shiftKey)$(this).siblings('.active').removeClass('active');
							if(eventConfig.selectCallback)eventConfig.selectCallback.call();
						});
						$node.off('click', '.eventtype').on('click', '.eventtype', conuntEvent);
						
						try{
							var pan = dragon.pan(),
								zoom = dragon.zoom(),
								entityPo = config.position,
								left = entityPo.x * zoom + pan.x + 40,
								top = entityPo.y * zoom + pan.y + 90;
							left = left > mining.browser.w - 500 ? mining.browser.w - 500 : left;
							left = left < 10 ? 10 : left;
							top = top > mining.browser.h - 450 ? mining.browser.h - 450 : top;
							top = top < 100 ? 100 : top;
							
							$node.css('left', left + 'px');
							$node.css('top', top + 'px');
						}catch(e){}
	    				appendToDlg($dlg, events);
					},
					onclose: function(){
						var $dlg = this; $node = $(this.node);
						
						$('.eventlist tbody tr',$node).each(function(){
							delete eventsData[$(this).attr('gid')];
						});
						dlgIdArr.remove($dlg.id);
						if(eventConfig.dataCallback)eventConfig.dataCallback.call();
					}
				}).show();
			}else{
				appendToDlg($dlg, events);
			}
		}
		
		/*var mergeEventData = function($dlg, events){
			if(mining.utils.isEmpty($dlg.events)){
				$dlg.events = [];
			}
			var _events = $dlg.events;
			$.each(events, function(i,n){
				if($('.eventlist tr[gid=' + n.id + ']',$node).size() < 1){
					_events.push();
				}
			});
		}*/
		
		var appendToDlg = function($dlg, events){
			var $node = $($dlg.node), 
				typeArr = $dlg.typeArr || [], 
				tbody = '';
			
			$.each(events, function(i,n){
				if($('.eventlist tr[gid=' + n.id + ']',$node).size() > 0)return;
				
				var showlabel = mining.mappingutils.getProperties(n, 'primary'), 
					timePro = mining.mappingutils.getTimeProp(n),
					objname = mining.mappingutils.getName(n),
					typename = mining.mappingutils.getTypeName(n),
					labelArr = [];
				
				if(mining.utils.isEmpty(showlabel))return;
				typeArr.pushOnly(objname);
				$.each(showlabel, function(j,m){
					labelArr.push(m.value);
				});
				tbody += ['<tr gid="' + n.id + '" objname="' + objname + '">',
					'<td class="txtc" style="width:66px"><span class="font20 ' + mining.mappingutils.getFontName(n) + '" title="' + typename + '"></span></td>',
					'<td class="time" style="width:160px">' + timePro.value + '</td>',
					'<td>' + labelArr.join('&nbsp;&nbsp;') + '</td>',
				'</tr>'].join('');
				n.etype = 'event';
				n.gid = n.id;
				eventsData[n.id] = n;
			});
			$('.eventlist tbody',$node).append(tbody);
			$dlg.typeArr = typeArr;
			refreshCount();
			arrangeEventList($dlg);
			if(eventConfig.dataCallback)eventConfig.dataCallback.call();
		}
		
		var arrangeEventList = function($dlg){
			var $node = $($dlg.node), trArr = [];
			
			$('.eventlist tbody tr',$node).each(function(i,n){
				trArr.push($(this)[0].outerHTML);
			});
			trArr.sort(function(a,b){return new Date($(b).find('.time').text()) - new Date($(a).find('.time').text())});
			$('.eventlist tbody',$node).html(trArr.join(''));
		}
		
		var closeEvent = function(entityArr){
			$.each(entityArr, function(i,n){
				try{
					getEventDlg(n).close().remove();
				}catch(e){}
			});
		}
		
		
		/* 时间筛选 */
		var timeFilter = function(range, checkedLabel, uncheckLabel){
			$.each(checkedLabel, function(i,n){
				$('.eventlistdlg .eventlist tr[objname=' + n + ']').removeClass('nofilter');
			});
			$.each(uncheckLabel, function(i,n){
				$('.eventlistdlg .eventlist tr[objname=' + n + ']').addClass('nofilter');
			});
			
			$('.eventlistdlg .eventlist tr:visible').each(function(){
				var time = $(this).find('.time').text(),
					d = new Date(time);
				
				if(range[0] <= d && d <= range[1]){
					$(this).removeClass('nofilter');
				}else{
					$(this).addClass('nofilter');
				}
			});
			refreshCount();
		}
		
		/* 类别筛选 */
		var labelFilter = function(uncheckLabel){
			$('.eventlistdlg .eventlist tr').removeClass('nofilter');
			$.each(uncheckLabel, function(i,n){
				$('.eventlistdlg .eventlist tr[objname=' + n + ']').addClass('nofilter');
			});
			refreshCount();
		}
		
		/* 关闭筛选 */
		var closeFilter = function(uncheckLabel){
			$('.eventlistdlg .eventlist tr.nofilter').removeClass('nofilter');
			refreshCount();
		}
		
		var getData = function(type, selected){
			var _arr = [];
			
			type = type || '';//:selected
			if(mining.utils.isEmpty(type)){
				$.each(eventsData, function(i,n){
					_arr.push(n);
				});
			}else if(type == ':selected'){
				$('.eventlistdlg .eventlist tr.active').each(function(){
					_arr.push(eventsData[$(this).attr('gid')]);
				});
			}else if($('.eventlistdlg .eventlist tr[gid=' + type + ']').size() > 0){
				return eventsData[type];
			}else{
				var _selected = '';
				if(selected == ':selected')_selected = '.active';
				$('.eventlistdlg .eventlist tr[objname=' + type + ']' + _selected).each(function(){
					_arr.push(eventsData[$(this).attr('gid')]);
				});
			}
			
			return _arr;
		}
		
		/* 删除元素 */
		var deleteElements = function(selector){
			var eles;
			//graph.startBatch();
			selector = selector || 'all';	//all | :selected | :unselected ...
			if(selector == 'all'){
				$.each(dlgIdArr, function(i,n){
					$dialog.get(n).close().remove();
				});
			}else if(selector == ':selected'){
				$('.eventlistdlg .eventlist tr.active').each(function(){
					var gid = $(this).attr('gid');
					
					delete eventsData[$(this).attr('gid')];
					$(this).remove();
				});
			}
			/*$.each(dlgIdArr, function(i,n){
				var $dlg = $dialog.get(n), $node = $($dlg.node);
				if($('.eventlistdlg .eventlist tr',$node).size() < 1)$dialog.get(n).close().remove();
			});*/
			if(eventConfig.dataCallback)eventConfig.dataCallback.call();
			refreshCount();
		}
		
		
		return {
			init: initEvent,
			refresh: refreshDlg,
			getdata: getData,
			appenddata: appendData,
			closeevent: closeEvent,
			delelements: deleteElements,
			timefilter: timeFilter,
			labelfilter: labelFilter,
			closefilter: closeFilter
		}
	}
});
