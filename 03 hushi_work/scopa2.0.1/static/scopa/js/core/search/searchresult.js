define(function(require){
	
	/**
     * @name homeSearch
     * @class 首页搜索。
     */
    var $page = $('.page-search'),
		requestUrl = {
			load: mining.baseurl.core + '/snapshot/load',				//sid
			search: mining.baseurl.core + '/query/search',			//content  type: all,entity,relation,event,media
			search_media: mining.baseurl.core + '/query/getByLabel',	//?vid='+_id+'&labels=[media_doc]
			search_snapshot: mining.baseurl.core + '/snapshot/listByEntity',	//keyword: 关键词type: [0: graph, 1: map]pageNo:pageSize:starttime:endtime:
			search_comment: mining.baseurl.core + '/comment/getByElementId',
			expandEdge: mining.baseurl.core + '/query/expandEdge'//?eid=XXX&label=XXX
		},
		searchParam = {
			content: '',
			type: 'all',
			pageSize: 20,
			pageNo: 0
		},
		snapshotModule = require('core/common/snapshot'),
		showModule = require('core/common/showelement'),
    	$searchbox,
    	$searchlist,
    	$resultlist,
    	$resultinfo,
    	speed = 300,
    	issearching = false,
    	isscrollsearch = false;
    
    
	var initSearch = function(){
		$searchbox = $('.homesearch',$page);
    	$searchlist = $('.searchlist',$page);
    	$resultlist = $('.resultlist',$page);
    	$resultinfo = $('.resultinfo',$page);
    	$searchlist.mCustomScrollbar({
    		theme:"minimal",
    		callbacks: {
    			onTotalScrollOffset: 200,
    			onTotalScroll: function(){
    				isscrollsearch = true;
    				doSearch();
    			}
    		}
    	});
    	$searchbox.off('keyup', '.searchbar-input').on('keyup', '.searchbar-input', function(e){
    		if(e.keyCode == mining.keyCode.ENTER){
    			doSearch();
    			mining.utils.serverLog(3);//用户行为记录
    		}
    	});
    	$searchbox.off('click', '.searchbar-submit').on('click', '.searchbar-submit', function(){
    		doSearch();
    		mining.utils.serverLog(3);//用户行为记录
    	});
    	$searchbox.off('click', '.searchbar-close').on('click', '.searchbar-close', function(){
    		issearching = false;
    		searchParam.content = '';
    		searchParam.type = 'all';
    		searchParam.pageNo = 0;
    		searchAnimate(false);
    		$('.searchbar-input',$searchbox).val('');
    	});
    	$searchbox.off('click', '.searchtype li').on('click', '.searchtype li', function(){
    		$(this).addClass('active').siblings('.active').removeClass('active');
    		if($('.home-searchpage',$page).is(':visible')){
    			doSearch();
    			mining.utils.serverLog(4);//用户行为记录
    		}
    	});
    	$searchlist.off('click', '.item').on('click', '.item', function(){
    		var $item = $(this), 
    			gid = $item.attr('gid'),
    			data = $item.data('data');
    		
    		if(mining.utils.isEmpty(gid) || $item.hasClass('active')){
    			infoAnimate(false);
    			$item.removeClass('active');
    			return;
    		}
	        $item.addClass('active').siblings('.active').removeClass('active');
    		infoAnimate(true);
			//主属性
	    	getPropInfo(data);
	        //含有该对象的研判子图
	        getSnapshotInfo(gid);
	         mining.utils.serverLog(5);//用户行为记录
    	});
    	$searchlist.off('click', '.action-graph').on('click', '.action-graph', function(e){
    		var $item = $(this).parents('.item:first'), 
    			data = $item.data('data');
    		
    		mining.utils.stopBubble(e);
    		showModule.show(data, 'graph');
    		mining.utils.serverLog(6);//用户行为记录
    	});
    	$searchlist.off('click', '.action-file').on('click', '.action-file', function(e){
    		var $item = $(this).parents('.item:first'), 
    			data = $item.data('data');
    		
    		mining.utils.stopBubble(e);
    		showModule.show(data, 'file');
    		mining.utils.serverLog(7);//用户行为记录
    	});
	}
	
	/* 搜索 */
	var doSearch = function(){
		if(issearching)return;
		issearching = true;
		
		var content = $('.searchbar-input',$searchbox).val(),
			stype = $('.searchtype li.active',$searchbox).attr('type') || 'all',
			loading = '<div class="item loading" style="border:none;"></div>';
		
		if(mining.utils.isEmpty(content) || (content == searchParam.content && stype == searchParam.type && ((isscrollsearch && $('.gray',$resultlist).size() > 0) || (!isscrollsearch && $('.item.loading',$resultlist).size() > 0)))){
			issearching = isscrollsearch = false;
			return;
		}
		isscrollsearch = false;
		if(content != searchParam.content || stype != searchParam.type){
			searchParam.pageNo = 0;
			$('.item',$resultlist).remove();
		}
		searchParam.content = content;
		searchParam.type = stype;
		searchAnimate(true);
		$('.searchtype li[type=' + stype + ']',$searchbox).addClass('active').siblings().removeClass('active');
		searchParam.pageNo++;
		$('.loading',$resultlist).remove();
		$resultlist.append(loading);
		$ajax.ajax({
    		url: requestUrl.search,
    		data: searchParam,
    		success: function(data){
    			$('.loading,.gray',$resultlist).remove();
				if(mining.utils.isEmpty(data.record)){
					$resultlist.append('<div class="item gray txtc" style="line-height:85px;font-size:16px;">' + ($('.item',$resultlist).size() > 0 ?'没有更多数据' : '暂无数据') + '</div>');
    				return;
				}
				var list = '', searchResultArr = [];
				$.each(data.record, function(i,n){
					if(!mining.utils.isEmpty(n.e)){
						var nodedata = n.e[0],
							propertyArr = mining.mappingutils.getProperties(nodedata, 'primary'),
							fromShow = mining.mappingutils.getDetailshow(nodedata, 'from'),
							svgicon = mining.mappingutils.getGraphIcon(nodedata),
							title = mining.mappingutils.getTitle(nodedata),
							etype = mining.mappingutils.getType(nodedata),
							primaryInfo = '';
						
						if(!mining.utils.isEmpty(title))primaryInfo += '<p class="itemtitle"><b>' + title + '</b></p>';
						searchResultArr.push(nodedata);
						//primaryInfo += '<tr><td class="txtl" colspan="' + fromShow.length + '"><p class="itemtitle"><b>' + title + '</b></p></td></tr>';
						//primaryInfo += '<tr class="highlight"><td class="txtl" colspan="' + fromShow.length + '"><b>详情：</b>' + (n.highlight[0].tag || '') + ' ' +  (n.highlight[0].message||'') + '</td></tr>';
						$.each(propertyArr, function(j,m){
							//if(typeof nodedata[i] != 'string') return;
							var info = '<b>' + m.name + '：</b>' + m.value;
							primaryInfo += '<p class="ellipsis" title="' + info.replace('<b>','').replace('</b>','') + '">' + info + '</p>';
						});
						if(n.highlight){
							var hightlightArr = [];
							$.each(n.highlight, function(j,m){
								$.each(m, function(k,o){
									hightlightArr.push(o);
								})
							})
							//primaryInfo += '<p><b>详情：</b>' + (n.highlight[0].tag || '') + ' ' +  (n.highlight[0].message||'') + '</p>';
							primaryInfo += '<p><b class="font14">详情：</b>' + hightlightArr.join(' ') + '</p>';
						}
						$resultlist.append(['<div class="item" gid="' + nodedata.gid + '">',
							'<div class="itemimg ' + etype + '"  style="background-image:url(' + svgicon+ ');">',
								'<img class="txtm" src="' + (nodedata.photoUrl ? nodedata.photoUrl : svgicon) + '" _src="' + svgicon + '">',
							'</div>',
							'<div class="iteminfo"><table><tbody>' + primaryInfo + '</tbody></table></div>',
							'<div class="itemaction">',
								'<a class="action-file" href="javascript:;" title="添加到档案"><span class="icon icon-toarchives"></span></a>',
								'<a class="action-graph" href="javascript:;" title="添加到图析"><span class="icon icon-tomappinganalysis"></span></a>',
							'</div>',
						'</div>'].join('')).children('.item:last').data('data', n);
					}else if(!mining.utils.isEmpty(n.v)){
    					var nodedata = n.v[0],
							propertyArr = mining.mappingutils.getProperties(nodedata, 'primary'),
							svgicon = mining.mappingutils.getGraphIcon(nodedata),
							title = mining.mappingutils.getTitle(nodedata),
							etype = mining.mappingutils.getType(nodedata),
							primaryInfo = '';
						
						//if(mining.utils.isEmpty(title))return;
						
						//处理文档展示
						if(nodedata.label == 'doc'){
							title = '标题：' + nodedata.filename;
							nodedata.photoUrl = staticUrl + '/scopa/images/core/entity_document.png';
						}
						
						primaryInfo += '<p class="itemtitle"><b>' + title + '</b></p>';
						$.each(propertyArr, function(i,n){
							if(typeof nodedata[i] != 'string') return;
							var info = '<b>' + n.name + '：</b>' + n.value;
							primaryInfo += '<p class="ellipsis" title="' + info.replace('<b>','').replace('</b>','') + '">' + info + '</p>';
						});
						if(n.highlight){
							var hightlightArr = [];
							$.each(n.highlight, function(j,m){
								$.each(m, function(k,o){
									hightlightArr.push(o);
								})
							})
							//primaryInfo += '<p><b>详情：</b>' + (n.highlight[0].tag || '') + ' ' +  (n.highlight[0].message||'') + '</p>';
							primaryInfo += '<p><b class="font14">详情：</b>' + hightlightArr.join(' ') + '</p>';
						}
						$resultlist.append(['<div class="item" gid="' + nodedata.gid + '">',
							'<div class="itemimg ' + etype + '"  style="background-image:url(' + svgicon+ ');">',
								'<img class="txtm" src="' + (nodedata.photoUrl ? nodedata.photoUrl : svgicon) + '" _src="' + svgicon + '">',
							'</div>',
							'<div class="iteminfo">' + primaryInfo + '</div>',
							'<div class="itemaction">',
								'<a class="action-file" href="javascript:;" title="添加到档案"><span class="icon icon-toarchives"></span></a>',
								'<a class="action-graph" href="javascript:;" title="添加到图析"><span class="icon icon-tomappinganalysis"></span></a>',
							'</div>',
						'</div>'].join('')).children('.item:last').data('data', n);
					}
				});
				mining.utils.checkImg($('.itemimg img',$resultlist));
				if(data.record.length < searchParam.pageSize && searchParam.pageNo == 1){
					$('.item:last',$resultlist).after('<div class="item gray txtc" style="line-height:85px;font-size:16px;">没有更多数据</div>');
				}else{
					$('.item:last',$resultlist).after('<div class="item loading"></div>');
				}
				$('.itemimg img', $resultlist).each(function() {
					var $img = $(this);
					var w = $img.width(), h = $img.height(), pw = $img.parent().width(), ph = $img.parent().height();
					if(w/h < pw/ph){
						$img.css('height', '100%');
					}else{
						$img.css('width', '100%');
					}
				});
    		},
    		error: function(data){
    			$dialog.alert(data.message, 'error');
    		},
    		complete: function(){
    			issearching = false;
    		}
    	});
	}
	
	/* 搜索展示动效 */
	var searchAnimate = function(open){
		var $searchbox = $('.homesearch',$page),
			searchmtop = 250,
			searchmbottom = 30,
			searchbarh = 50,
			searchfont = 16,
			searchsize = '19%',
			typemtop = 15,
			typefont = 18,
			closedisplay = 'none',
			showlist = '.home-searchpage',
			//hidelist = '.home-infopage';
			hidelist = '.home-infopage222';
		
		if(open){
			searchmtop = 20;
			searchmbottom = 16;
			searchbarh = 35;
			searchfont = 14;
			typemtop = 5;
			typefont = 14;
			searchsize = '16%';
			closedisplay = 'inline-block';
			closeopacity = 0;
			showlist = '.home-infopage';
			hidelist = '.home-searchpage';
		}
		
		//homesearch
		$searchbox.animate({
			'margin-top': searchmtop,
			'margin-bottom': searchmbottom
		}, speed);
		$('.searchbar',$searchbox).animate({
			'height': searchbarh
		}, speed);
		$('.searchbar-input,.searchbar-submit',$searchbox).animate({
			'height': searchbarh - 2,
			'line-height': searchbarh - 2,
			'font-size': searchfont,
			'background-size': searchsize
		}, speed);
		$('.searchtype li',$searchbox).animate({
			'margin-top': typemtop,
			'font-size': typefont
		}, speed);
		
		$('.searchbar-close',$searchbox).css({
			'display': closedisplay,
			'opacity': 0
		}).animate({
			'opacity': 0.8
		}, speed);
		
		//list
		$(showlist,$page).animate({
			'opacity': 0
		}, {
			duration: speed, 
			complete: function(){
				$(showlist,$page).hide();
			}
		});
		$(hidelist,$page).animate({
			'opacity': 1
		}, speed).slideDown(speed);
		
		infoAnimate(false);
	}
	
	/* 信息展示动效 */
	var infoAnimate = function(open){
		var searchlistw = '100%',
			resultinfow = '0%';
		
		if(open){
			searchlistw = '57%';
			resultinfow = '42%';
			$resultinfo.show();
		}
		$searchlist.animate({width:searchlistw}, speed);
		$resultinfo.animate({width:resultinfow}, {
			duration: speed,
			complete: function(){
				if(!open)$resultinfo.hide();
			}
		});
	}
	
	/* 含有该对象的研判子图 */
	var getSnapshotInfo = function(gid){
		$('.snapshotitem',$resultinfo).html('<li class="loading gray"></li>');
        getdata(1);
        function getdata(num){
            var total=num ?0:$('.snapshotitem',$resultinfo).attr('pSize');
            if($('.snapshotitem li[sid]').length>0&&$('.snapshotitem li[sid]').length==total) return;
			var pageNo=num?1:( Number($('.snapshotitem',$resultinfo).attr('pNo'))+1);
		    $ajax.ajax({
			url: requestUrl.search_snapshot,
			data: {
				keyword: gid,
				type: 0,
				pageNo: pageNo,
				pageSize: 20
			},
			success: function(data){
				var snapshotitem = '';total=data.totalCount;
				if(mining.utils.isEmpty(data.bodyData)){
					if(data.pageNo == 1)$('.snapshotitem',$resultinfo).html('<li class="gray">暂无相关研判子图</li>');
					return;
				}
				$.each(data.bodyData, function(i,n){
		        	snapshotitem += ['<li sid="' + n.id + '">',
						'<div class="snapshotimg"><img src="' + mining.baseurl.core + '/snapshot/getThumbnail?sid=' + n.id + '" style="height:100%;"></div>',
						'<div class="snapshotinfo">',
							'<p class="ellipsis" title="' + n.name + '"><b>项目名称：</b>' + n.name + '</p>',
							'<p class="ellipsis"><b>作者：</b>' + n.author.user_id + '</p>',
							'<p class="ellipsis" title="' + n.description + '"><b>描述：</b>' + n.description + '</p>',
							'<p><b>时间：</b>' + moment(parseInt(n.ts)).format('YYYY-MM-DD HH:mm:ss') + '</p>',
						'</div>',
					'</li>'].join('');
		    	});
		        $('.snapshotitem',$resultinfo).append(snapshotitem).attr('pNo',pageNo).attr('pSize',data.totalCount);
		        $('.snapshotitem',$resultinfo).off('click', 'li[sid]').on('click', 'li[sid]', function(){
		        	snapshotModule.open({
						id: $(this).attr('sid')
					});
		        });
                $('.snapshotitem li.loading',$resultinfo).remove();
			},
			error: function(data){
				mining.utils.alertMsg(data, '获取子图数据失败，请稍后重试！', 'error');
			}
		});
        }
        $('.snapshotlist',$resultinfo).mCustomScrollbar({
    		theme:"minimal" ,
            callbacks:{
                onTotalScroll: function(){
                    getdata();
                }
            }
    	});
	}
	
	/* 副属性 */
	var getPropInfo = function(data){
		$('.propitem',$resultinfo).html('<li class="loading gray"></li>');
		var itemdata, minorPorps = [], props = '';
		if(data.e){
			itemdata = data.e[0];
		}else if(data.v){
			itemdata = data.v[0];
		}else{
			itemdata = '';
		}
		minorPorps = mining.mappingutils.getProperties(itemdata, 'minor');
		
		//处理文档展示
		if(itemdata.label == 'doc' && mining.utils.isEmpty(minorPorps)){
			minorPorps.dt = {
				name: '创建时间',
				value: itemdata.dt ? moment(parseInt(itemdata.dt)).format('YYYY-MM-DD') : '未知'
			}
			minorPorps.operator = {
				name: '作者',
				value: itemdata.username
			}
			minorPorps.size = {
				name: '文档大小',
				value: itemdata.size
			}
		}
		
		if(mining.utils.isEmpty(minorPorps)){
			props = '<p class="grap txtc">暂无数据</p>';
		}else{
			$.each(minorPorps, function(i,n){
				if(n.value)props += '<div class="col-sm-6 ellipsis" title="' + n.value + '"><b>' + n.name + '：</b>' + n.value + '</div>';
			});
		}
		$('.propitem',$resultinfo).html(props);
        $('.proplist',$resultinfo).mCustomScrollbar({
			theme:"minimal"
		});
	}
	
	return {
		init:initSearch
	}
});
