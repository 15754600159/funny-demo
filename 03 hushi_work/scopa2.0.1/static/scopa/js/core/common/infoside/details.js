define(function(require, exports, module){
	
	/**
     * @name Details
     * @class 右侧详情功能。
     */
    var defaultConfig = {
	    	graph: null,
	    	eventModule: null,
	    	container: null,
	    	selection: null,
	    	eventarr: null
	    },
	    requestUrl = {
	    	merge: mining.baseurl.core + '/query/merge',	//POST 调用：参数 ids, events, rules, keyword(ids, events, rules 都是 JSONArray)
	    	expandEdge: mining.baseurl.core + '/query/expandEdge',//?eid=XXX&label=XXX
	    	expandHartsEdge: mining.baseurl.core + '/query/expandHartsEdge'//?eid0=110104198403160432&eid1=130102198807150610&events=railway,hotel身份证号
	    },
	    customElement = require('core/common/customelement');
	
	module.exports = function(){
		var graph = null,
			eventModule = null,
		    selection = null,
		    eventarr = null,
		    selection2 = null,
		    $info, $details;
		
		/* 初始化详情 */
		var initDetails =  function(config){
			config = $.extend({}, defaultConfig, config);
			graph = config.graph;
			eventModule = config.eventModule;
			$info = config.container;
			$details = $('.info-details',$info);
			selection = config.selection || [];
			eventarr = config.eventarr || [];
			
			if(mining.utils.isEmpty(graph) || $info.size() < 1 || $details.size() < 1) return;
			
			$('.propertylist,.selectedlist',$details).mCustomScrollbar({
				theme:"minimal"         
			});
			
			initEvent();
			refreshDetails();
		}
		
		
		/* 初始化事件 */
		var initEvent = function(){
			$details.off('click', '.detailsitem').on('click', '.detailsitem', function(){
				if($(this).index()==0) return;
				showItemDetails($(this));
				if($('.page-graph .breadnav-graph').hasClass('active')){
					mining.utils.serverLog(51, $(this).find('.name').attr('title'));//用户行为记录
				}else if($('.page-map .breadnav-map').hasClass('active')){
					mining.utils.serverLog(71, $(this).find('.name').attr('title'));//用户行为记录
				}
			});
		}
		var showItemDetails = function($item){
			var gid = $item.attr('gid');
			
			if($item.size() < 1 || $item.hasClass('active') || mining.utils.isEmpty(gid)){
				var _gid = $('.primaryinfo',$details).attr('gid');
				if(mining.utils.isEmpty(_gid) || graph.$('#' + _gid).length < 1){
					if(graph.elements().length < 1){
						emptyInfo();
						return;
					}else{
						_gid = graph.elements().data().data.gid;
					}
				}
				gid = _gid;
			}else if(!mining.utils.isEmpty(gid) && graph.$('#' + gid).length < 1 && $('.eventlistdlg .eventlist tr[gid=' + gid + ']').size() < 1){
				emptyInfo();
				if(graph.elements().length < 1)return;
				try{
					gid = graph.elements().data().data.gid;
				}catch(e){
					gid = graph.elements()[0].data().data.gid;
				}
			}
			$item.addClass('active').siblings().removeClass('active');
			
			var element, edata,dataArr = [];
			try{
				element = selection.filter('#' + gid);
			}catch(e){
				$.each(selection, function(i,n){
					if(n.data().data.gid == gid){
						element = n;
						return true;
					}
				});
			}
            if(mining.utils.isEmpty(element) || element.length == 0){
            	if($('.eventlistdlg .eventlist tr[gid=' + gid + ']').size() > 0){
            		edata = eventModule.getdata(gid);
            	}else{
            		if($.isArray(graph.$('#' + gid))){
            			edata = graph.$('#' + gid)[0].data().data;
            		}else{
            			edata = graph.$('#' + gid).data().data;
            		}
            		
            	}
            }else{
            	edata = element.data().data;
            }
			
			if(edata.etype == 'relation'){
				formatRelationHtml(edata, $item)
			}else{
				formatEntityHtml(edata, $item);
			}
			mining.utils.checkImg($('.itemthumb img',$details));
			$('.propertylist',$details).height($info.height() - $('.primaryinfo',$details).height() -115 - $('.selectedlist',$details).height());
		}
		var appendProHtml = function(prodata){
			if(mining.utils.isEmpty(prodata))return;
			$.each(prodata, function(pro,data){
				if($('.propertylist tbody [pro=' + pro + ']',$details).size() < 1)$('.propertylist tbody',$details).append('<tr><td class="ellipsis" title="' + data.value + '" pro="' + pro + '"> <b>' + data.name + '</b>：' + data.value + '</td></tr>');
			})
		}
		var formatEntityHtml = function(data, $item){
			var primaryArr = mining.mappingutils.getProperties(data, 'primary'),
				minorArr = mining.mappingutils.getProperties(data, 'minor'),
				primaryInfo = '';
			
			data = mining.mappingutils.formatProperty(data);
            $('.eventtab',$details).remove();
			$('.propertylist main',$details).remove();
			$('.propertylist tbody',$details).html('');
			$('.propertylist tbody',$details).html('<tr><td ><b>类型&nbsp;/&nbsp;描述</b></td></tr>');
			$.each(primaryArr, function(i,n){
				if(typeof data[i] != 'string') return;
				var info = '<b>' + n.name + '：</b>' + n.value;
				primaryInfo += '<p class="ellipsis" title="' + info.replace('<b>','').replace('</b>','') + '">' + info + '</p>';
			});
			appendProHtml(minorArr);
			var svgicon = mining.mappingutils.getGraphIcon(data).replace('_locked','');
			
			$('.primaryinfo',$details).html(['<div class="infobox" key="' + data.key + '">',
				'<div class="itemthumb ' + data.etype + (data.label == 'person' && data.PERSON_xb == '女' ? ' women':'') + '" style="background-image:url(' + svgicon+ ');">',
					'<img class="txtm" src="' + (data.photoUrl ? data.photoUrl : svgicon) + '" _src="' + svgicon + '">',
				'</div>',
				'<div class="iteminfo">' + primaryInfo + '</div>',
			'</div>'].join('')).removeClass('relationinfo').attr('gid', data.gid);
			if(data.specficType == 'custom' && data.owner == mining.userinfo.user_id){
				$('.primaryinfo',$details).off('click','.delcustomele').on('click','.delcustomele',function(){
					customElement.del({
		        		id: data.gid,
		        		type: 'entity',
		        		success: function(){
		        			graphModule.delelements('#' + data.gid)
		        		}
		        	});
					if($('.page-graph .breadnav-graph').hasClass('active')){
						mining.utils.serverLog(52, '实体：gid=' + data.gid);//用户行为记录
					}else if($('.page-map .breadnav-map').hasClass('active')){
						mining.utils.serverLog(72, '实体：gid=' + data.gid);//用户行为记录
					}
				}).append('<button class="btn-current delcustomele">删除</button');
			}
			$('.propertylist',$details).mCustomScrollbar('scrollTo',0)
		}
		
		var formatRelationHtml = function(edata, $item){
			var data = edata,
				labels = mining.mappingutils.getShowlabel(data),
				sourcedata = graph.filter('#' + edata.from).data().data,
				targetdata = graph.filter('#' + edata.to).data().data,
				edge_info = $item.data('edge_info') || [],
				svgicon = mining.mappingutils.getGraphIcon(data).replace('_locked',''),
				sourceicon = mining.mappingutils.getGraphIcon(sourcedata).replace('_locked',''),
				targeticon = mining.mappingutils.getGraphIcon(targetdata).replace('_locked','');
			
			$('.primaryinfo',$details).html(['<div class="infobox" key="' + sourcedata.key + '">',
				'<div class="itemthumb ' + (sourcedata.label == 'person' && sourcedata.PERSON_xb == '女' ? ' women':'') + '"  style="background-image:url(' + sourceicon+ ');">',
					'<img class="txtm" src="' + (sourcedata.photoUrl ? sourcedata.photoUrl : sourceicon) + '" _src="' + sourceicon + '">',
				'</div>',
				'<div class="iteminfo"><b>' + mining.mappingutils.getTitle(sourcedata).replaceAll('-','\n') + '</b></div>',
			'</div>',
			'<div class="infobox rinfo">',
				(data.label == 'harts' ? ('<div class="hartslabel">' + mining.mappingutils.getRuleLabel(data).join('</br>') + '</div>') : ('<div class="itemthumb"  style="background-image:url(' + svgicon+ ');"><img class="txtm" src="' + (data.photoUrl ? data.photoUrl : svgicon) + '" _src="' + svgicon + '"></div><div class="iteminfo">' + (mining.utils.isEmpty(labels) ? '' : labels[0].value + (labels[1] ? '（' + labels[1].value + '）' : '' )) +'</div>')),
				'<div class="itemline"><span class="pull-left"></span><span class="pull-right"></span></div>',
			'</div>',
			'<div class="infobox" key="' + targetdata.key + '">',
				'<div class="itemthumb ' + (targetdata.label == 'person' && targetdata.PERSON_xb == '女' ? ' women':'') + '"  style="background-image:url(' + targeticon+ ');">',
					'<img class="txtm" src="' + (targetdata.photoUrl ? targetdata.photoUrl : targeticon) + '" _src="' + targeticon + '">',
				'</div>',
				'<div class="iteminfo"><b>' + mining.mappingutils.getTitle(targetdata).replaceAll('-','\n') + '</b></div>',
			'</div>'].join('')).addClass('relationinfo').attr('gid', data.gid);
			
			if(data.specficType == 'custom' && data.owner == mining.userinfo.user_id){
				$('.primaryinfo',$details).off('click','.delcustomele').on('click','.delcustomele',function(){
					customElement.del({
		        		id: data.gid,
		        		type: 'relation',
		        		success: function(){
		        			graphModule.delelements('#' + data.gid)
		        		}
		        	});
					if($('.page-graph .breadnav-graph').hasClass('active')){
						mining.utils.serverLog(52, '关系：gid=' + data.gid);//用户行为记录
					}else if($('.page-map .breadnav-map').hasClass('active')){
						mining.utils.serverLog(72, '关系：gid=' + data.gid);//用户行为记录
					}
				}).append('<button class="btn-current delcustomele">删除</button');
			}
			
			$('.propertylist main',$details).remove();
			$('.propertylist tbody',$details).html('');

			if(mining.utils.isEmpty(edge_info)){
				if(data.label == 'harts'){
                   var 	hartsDetails= new (require('./hartsdetails'))();
					$('.propertylist table',$details).after('<main role="main"><p class="txtc">数据加载中，请稍候...</p></main>');
					setTimeout(function(){
						hartsDetails.init(data,$('.propertylist',$details),$('.infobox:first', $details).attr('key'),$('.infobox:last', $details).attr('key'));
						//expendHartsEdge(data,$item);
					}, 100);
					
				}else{
                    $('.eventtab',$details).remove();
                  var  primary_info=	mining.mappingutils.getProperties(data,'primary');
					edge_info=	mining.mappingutils.getProperties(data,'minor');

                    $('.propertylist tbody',$details).html('<tr><td><b>类型&nbsp;/&nbsp;描述</b></td></tr>');
                    appendProHtml(primary_info);
                    $('.propertylist tbody',$details).append('<tr><td>&nbsp;</td></tr>');
                    appendProHtml(edge_info);
                    
                    $ajax.ajax({
						url: requestUrl.expandEdge,
						data: {
							eid: data.gid,
							label: data.label
						},
						success: function(result){
							if(mining.utils.isEmpty(result) || mining.utils.isEmpty(result.edge_info))return;
							$.each(result.edge_info, function(i,n){
								n.label = data.label;
								n.type = data.type;
								var  pro_info =	mining.mappingutils.getProperties(n);
								appendProHtml(pro_info);
							});
						}
					});
				}
				
			}
			
		}
		
		var emptyInfo = function(){
			$('.propertylist main',$details).remove();
			$('.primaryinfo,.propertylist tbody,.detailslist',$details).html('').removeAttr('gid');
		}
		
		var expendHartsEdge = function(data,$item){
			var mergedata = [], edge_info = [];
			
			mining.utils.modalLoading();
			$.ajax({
			    url: requestUrl.merge,
			    type: "POST",
			    headers: {
			        "Content-Type": "application/json",
			    },
			    contentType: "application/json",
			    data: JSON.stringify({
					ids: [data.to_key,data.from_key],
					events: [],
					rules: mining.mappingutils.getHartEvents(data).join(',')
				}),
				success: function(mdata){
					seajs.log(mergedata);
					mergedata = mdata.l || [];
					//if(mining.utils.isEmpty(data))return;
					//graphModule.appenddata(mining.utils.frmatMergeData(data, data));
					expandHartsEdge2(data,$item,mergedata,edge_info);
				},
				error: function(result){
					mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
				}
			});
		}
		
		var expandHartsEdge2 = function(data,$item,mergedata,edge_info){
			$.ajax({
				url: requestUrl.expandHartsEdge,
				data: {
					eid0: data.from_key,
					eid1: data.to_key,
					events: mining.mappingutils.getHartEvents(data).join(',')
				},
				type: 'get',
				success: function(result){
					edge_info = result.edge_info;
					$item.data('edge_info', edge_info);
					expandHartsEdge3(data,$item,mergedata,edge_info);
				},
				error: function(result){
					seajs.log('获取事件信息失败，请稍后重试！')
				}
			});
		}
		var expandHartsEdge3 = function(data,$item,mergedata,edge_info){
			$('.propertylist main',$details).remove();
			$('.propertylist tbody',$details).html('');
			mining.utils.modalLoading('close');
			if(mining.utils.isEmpty(edge_info)) return;
			
			var getTxt = function(sdata, name){
				var _txt = '',
					railwayArr = ["train_event","train","railway"],
					hotelArr = ["hotel_event","hotel"];
				/*: '出行',
				: '住宿',
				"household_relation": '户口',
				"criminal_relation": '犯罪',
				: '出行',
				: '住宿',
				: '住宿',
				"household": '户口',
				"criminal": '犯罪'*/
		
				if(railwayArr.indexOf(name) != -1){
					_txt = sdata.cc + '</br>' + sdata.eTRAIN_fz + '-' + sdata.eTRAIN_dz;
				}else if(hotelArr.indexOf(name) != -1){
					 _txt = sdata.eHOTEL_ldmc + ' ' + sdata.eHOTEL_fjh + '房';
				}
				return _txt;
			}
			$.each(edge_info, function(i,n){
				$.each(n.events, function(name,o){
					var txt = '';
					
					txt = mining.mappingutils.getLabelName(name);
					//$('.propertylist table',$details).after(['<div style="font-weight:bold;font-size:16px;line-height:40px;">' + txt + '</div><ul class="timelineinfo"></ul>'].join(''));
					
					var dataArr = o[0].concat(o[1]);
					
					dataArr.sort(function(a,b){
						return parseInt(b.time) - parseInt(a.time);
					});
					
					$.each(mergedata, function(p,q){
						$.each(dataArr, function(h,g){
							if(mining.utils.isEmpty(g))dataArr.remove(g);
							try{
								if(q.from == g.id){
									g.harts = true;
									$.each(dataArr, function(_h,_g){
										if(q.to == _g.id){
											dataArr.remove(_g);
											return true;
										}
									});
								return true;
							}
							}catch(e){
								seajs.log(g)
							}
						})
					});
					if(!mining.utils.isEmpty(dataArr))$('.propertylist table',$details).after("<main role='main'><h4>" + txt + "</h4><ol class='timelineinfo'></ol></main>");
					$.each(dataArr, function(p,q){
						/*$('.propertylist .timelineinfo',$details).append(['<li>',
							'<div class="direction-' + (q.key == data.from_key ? 'l' : 'r') + '">',
								'<div class="flag-wrapper">',
									'<span class="flag">' + getTxt(q,name) + '</span>',
								'</div>',
							'</div>',
						'</li>'].join(''));*/
						if(mining.utils.isEmpty(q) || mining.utils.isEmpty(q.key)){
							return;
						}
						var _time = moment(parseInt(q.time)).format('YYYY-MM-DD HH:mm:ss'),
							isLR = '';
							
						if($('.infobox:first',$details).attr('key').indexOf(q.key) != -1){
							isLR = 'l';
						}else if($('.infobox:last',$details).attr('key').indexOf(q.key) != -1){
							isLR = 'r';
						}
						if(mining.utils.isEmpty(isLR)){
							return;
						}
						$('.propertylist .timelineinfo:first',$details).append(['<li class="timelineinfo-' + (q.harts ? 'l timelineinfo-hartsinfo' : isLR) + '">',
							getTxt(q,name),
							"<time datetime='" + _time + "'>" + _time + "</time>",
							"<button></button>",
						'</li>'].join(''));
					});
				});
			});
		}
		
		/* 刷新数据 */
		var refreshDetails = function(){
			$('.detailslist',$details).empty();
			var eles;
			var mainDataArr = [];
			try{
				eles = selection.filter('edge.relation:selected,node:selected');
			}catch(e){
				eles = selection;
			}
			$.each(eles, function(i,n){
				mainDataArr.push(n.data().data);
			})
			mainDataArr = eventarr.concat(mainDataArr);
            $('.detailslist',$details).append(['<div class="detailsitem" >',
                '<div class="num"><b>编号</b></div>',
                '<div class="name ellipsis" ><b>名称</b></div>',
                '</div>'].join(''));
            var _tmpl = '';
			$.each(mainDataArr, function(i,n){
				var data = n,
					title = mining.mappingutils.getTitle(data);
				
				_tmpl += ['<div class="detailsitem" gid="' + data.gid + '">',
					'<div class="num">' +( i+1) + '</div>',
				/*	'<div class="icon"><span class="itemicon" style="background-image:url(' + mining.mappingutils.getGraphIcon(data) + ')"></span></div>',*/
					'<div class="name ellipsis" title="' + title + '">' + title + '</div>',
				'</div>'].join('');
			});
			$('.detailslist',$details).append(_tmpl);
			var $item, gid;
			
			if(eventarr.length == 1){
				gid = eventarr[0].id;
			}else if(graph.nodes('.entity:selected').length == 1){
				try{
					gid = graph.nodes('.entity:selected').data().id;
				}catch(e){
					gid = graph.nodes('.entity:selected')[0].data().id
				}
			}else if(graph.nodes('.event:selected').length == 1){
				try{
					gid = graph.nodes('.event:selected').data().id;
				}catch(e){
					gid = graph.nodes('.event:selected')[0].data().id
				}
			}else if(graph.edges('.relation:selected').length == 1){
				try{
					gid = graph.edges('.relation:selected').data().id;
				}catch(e){
					gid = graph.edges('.relation:selected')[0].data().id
				}
			}
			$item = $('.detailsitem[gid=' + gid+ ']',$details);
			if(mining.utils.isEmpty($item) || $item.size() < 1){
				$item = $('.detailsitem:first',$details).next();
			}
			showItemDetails($item);
		}
		
		
		return {
			init: initDetails
		}
	}
});