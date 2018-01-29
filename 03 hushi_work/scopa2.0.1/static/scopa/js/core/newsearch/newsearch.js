define(function(require){
	/* ---------- 检索 ---------- */
	var $page = $('.page-newsearch');
	//高级搜索性别、民族等字典值
	var enumValus = require('./getAllPropertyEnumValues');
	var Apis={
		search:mining.baseurl.core+'/query/search'
	}
	var pageParams={
		personCondition:{items:[]},
		carCondition:{items:[]},
		caseCondition:{items:[]},
		enumDataMap:[],
		tempTmpl:'',
		label:'person',
		pageNo:1,
		pageSize:20,
		postData:{},
		type:'all',//搜索类型
		vMap:{},//实体对象和gid的映射，跳转到档案盒图析时用到
		showResult:false,
		noCondition:true,
		casedate:[]
	};
	var w=mining.browser.w;
	var $searchCard=$('.search-card',$page);
	var $resultCard=$('.result-card',$page);
	var $keyWord=$('.key-word',$page);
	var pushLeft=(w-$searchCard.width()-32)/2;
	var pushRight=$resultCard.width()+20;
	var showModule = require('core/common/showelement');
	window.newsearch_showModule = showModule
	
	require('./underscore');
	require('daterangepicker');
	require('pagination');
	
	
	//刷新布局
    var pageResize = function(){
    	//TODO
    }
    
	/* 初始化 */
    var initPage = function(){
    	$page = $('.page-newsearch')
    	
    	mining.utils.loadPage($page, function(){
			mining.utils.winResize({name:pageResize}); 
    		
			$searchCard=$('.search-card',$page);
			$resultCard=$('.result-card',$page);
			$keyWord=$('.key-word',$page);
			pushLeft=(w-$searchCard.width()-32)/2;
			pushRight=$resultCard.width()+20;
	
    		//initLayout();
			getEnumValues();
			bindEvents();
			//$title.click(function(e){
			$(document).off('click.newsearch','.page-newsearch .select-title').on('click.newsearch','.page-newsearch .select-title',function(e){
				selectUp();
				var $selectChip=$(this).parents('.select-chip');
				var $dl=$selectChip.find('dl');
				var $icon=$(this).find('i');
				if($icon.hasClass('select-title-rotate')){
					$icon.removeClass('select-title-rotate');
					$dl.hide('fast');
				}else{
					$icon.addClass('select-title-rotate');
					$dl.show('fast');
				}
				e.stopPropagation();
			})
			//$dd.click(function(){
			$(document).off('click.newsearch','.page-newsearch .select-option dd').on('click.newsearch','.page-newsearch .select-option dd',function(){
				var title=$(this).parents('.select-chip').find('.select-title span');
				title.text($(this).text());
				//alert($(this).data('value'));
				title.attr('data-value',$(this).data('value'));
				selectUp();
				mining.utils.serverLog(553,$(this).text());
			})
			$(document).off('click.newsearchall').on('click.newsearchall', function(){
				selectUp();
			})
			$(document).off('click.newsearch','.action-file').on('click.newsearch','.action-file',function(){
				var v=pageParams.vMap[$(this).data('gid')];
				//console.log(v);
				showModule.show({v:[v]}, 'file')//到档案
				mining.utils.serverLog(557, v.label+','+ v.key);
			})
			$(document).off('click.newsearch','.action-graph').on('click.newsearch','.action-graph',function(){
				var v=pageParams.vMap[$(this).data('gid')];
				console.log(v);
				showModule.show({v:[v]}, 'graph')//到图析
				mining.utils.serverLog(556, v.label+','+ v.key);
			})
		    //滚动条
		    $(".scroll-view",$page).mCustomScrollbar({
		        theme: 'minimal'
		    });
       	
	    	seajs.log('检索');
    	});
    }

	/*-------------------------------------------------------------------------------------*/
	function main(){
		initLayout();
		getEnumValues();
		bindEvents();
	}
	/**
	 * [getEnumValues 获取字典接口数据]
	 * @return {[type]} [description]
	 */
	function getEnumValues(){
		packEnumData(enumValus.listObj);
	}
	/**
	 * [packEnumData 字典数据重新拼装]
	 * @param  {[type]} datas [description]
	 * @return {[type]}       [description]
	 */
	function packEnumData(datas){
		pageParams.personCondition.items=[];
		pageParams.carCondition.items=[];
		pageParams.caseCondition.items=[];
		_.each(datas, function (item) {
			var info=conditionTitleMap(item.property);
			var type=item.property.split('_')[0];
			var data={};
				data.title=info.title;
				data.value=item.enumValues.split(',');
			if(type=='PERSON'){
				pageParams.personCondition.items.push(data.title);
				//console.log(pageParams.personCondition);
			}else if(type=='VEHICLE'){
				pageParams.carCondition.items.push(data.title);
			}else if(type=='CASE'){
				pageParams.caseCondition.items.push(data.title);
			}
			pageParams.enumDataMap.push(data);
			//console.log(pageParams.enumDataMap);
		})
		pageParams.caseCondition.items.push('报案日期');
	}
	/**
	 * [getTmplString 获取模版字符串]
	 * @return {[type]} [description]
	 */
	function getTmplString(){
		//var tmpl;
		var datas={};
		if(pageParams.label=='person'){
			datas=pageParams.personCondition;
			pageParams.title='性别';
		}else if(pageParams.label=='vehicle'){
			datas=pageParams.carCondition;
			pageParams.title='车辆类型';
		}else if(pageParams.label=='case'){
			datas=pageParams.caseCondition;
			pageParams.title='案件来源';
		}
		datas.title=pageParams.title;
		_.each(pageParams.enumDataMap, function (item) {
			if(item.title==pageParams.title){
				datas.values=item.value;
			}
		})
		var tmpl_string=$('#condition-tpl').html();
		return  _.template(tmpl_string)(datas);
	}
	/**
	 * [renderCondition 模版render到页面]
	 * @return {[type]} [description]
	 */
	function renderCondition(){
		var tmpl="<div class='search-item'>"+getTmplString()+'</div>';
		$('.condition-card').html(tmpl);
	}
	function renderResult(){
		var data=pageParams.postData;
		data.pageNo=pageParams.pageNo;
		data.pageSize=pageParams.pageSize;
		$ajax.ajax({
			url: Apis.search,
			//type: 'get',
			dataType: 'json',
			data: data,
			//traditional:true,
			beforeSend:function(){
				$('.result-card .table').html("<div class='loading'></div>");
			},
			success:function(res){
				//console.log(JSON.stringify(res));
				if(res.record){
					if(res.record.length==0){
						$('.result-card .table').html('<p class="no-data">暂无数据</p>');
					}else{
						_.each(res.record,function(item){
							var data = item.v[0];
							pageParams.vMap[data.gid]=data;
						})
						var tmpl_string=$('#result-tpl').html();
						$('.result-card .table').html(_.template(tmpl_string)(res));
						mining.utils.checkImg($('.entityimg',$page))
					}
					if($('.pages').html()==''){
						renderPages(res);
					}
				}
			},
			error:function(result){
				var msg = '检索失败，请稍候重试！';
				if(result && result.message)msg = result.message;
				$dialog.alert(msg, 'error');
			}
		})
	}
	//分页
    //var pageSize = 20;
    var renderPages = function(data){
        var pagesCount = Math.ceil(data.total / pageParams.pageSize);
        $('.total-num').text(data.total);
        //var pagesCount=5;
        // render pageCount
        var pagesCountData = {
            totalCount: data.total,
            //totalCount:10,
            pagesCount: pagesCount
        };
        // render pages
        var pagesData = {
            num_edge_entries: 2,
            num_display_entries: 4,
            callback: function(pageIndex){
            	pageParams.pageNo = pageIndex + 1;
            	$('.current-page').text(pageParams.pageNo);
            	//$('.result-card .table').html("<div class='loading'></div>");
            	renderResult();
	           /* pageNo = (pageIndex + 1);
	            if(!(initial && pageNo == 1)){
	                initial = false;
	                if(isFilter){
	                    filterData();
	                }else{
	                    getData('yjsbList',[]);
	                }
	            }*/
	        },
            items_per_page: 1,
            link_to: 'javascript:;',
            current_page: (pageParams.pageNo-1),
            prev_text: '<i></i>',
            next_text: '<i></i>'
        };
        $('.data-page .pages',$page).pagination(pagesCount,pagesData);
    }
	/**
	 * [bindEvents 事件集合]
	 * @return {[type]} [description]
	 */
	function bindEvents(){
		//mune菜單
		$('.navbar-nav li').removeClass('active');
		$('.navbar-nav .nav-search').addClass('active');
		$(document).off('click.newsearch','.search-keyword i').on('click.newsearch','.search-keyword i',function(){
			//console.log(left);
			if($.trim($keyWord.val()) != ''){
				//showResult();
				$('.clear-key').show();
				$('.super-search-btn button').click();
			}else {
				$('.search-keyword').addClass('animat-focus').one('webkitAnimationEnd',function(){
					$(this).removeClass('animat-focus');
				});
			}
			mining.utils.serverLog(558,$keyWord.val());
		})
		$('.clear-key').off('click.newsearch').on('click.newsearch',function(){
			$('.key-word').val('');
			$('.clear-conditions').click();
			$('.clear-key').hide();
			hideResult();
		})
		/**
		var last;
		$(document).off('click.newsearch','.key-word').on('click.newsearch','.key-word',function(event){
			last = event.timeStamp;
			var me=$(this);
			setTimeout(function(){
				if(last-event.timeStamp==0){
					var key=me.val();
					//console.log(key);
					if(key==''){
						hideResult();
					}
				}
			},1000);
		})
		**/
		$(document).off('click.newsearch','.tab-item').on('click.newsearch','.tab-item',function(){
			if(!$(this).hasClass('current')){
				$('.tab-item').removeClass('current');
				$(this).addClass('current');
				pageParams.type=$(this).data('value');
                pageParams.postData['type']=pageParams.type;
				var content=$('.key-word').val();
				pageParams.postData["content"]=content;
				if(!mining.utils.isEmpty($('.key-word').val()))showResult();
			}
			 mining.utils.serverLog(550,$(this).find('p').text());
		})
		$(document).off('click.newsearch','.legal-case dd').on('click.newsearch','.legal-case dd',function(){
			var type=$(this).data('value');
			if(type!='-1'){
				pageParams.label=type.toLowerCase();
				renderCondition();
				$('.condition-card').show();
				pageParams.noCondition=false;
			}else{
				$('.condition-card').hide();
				pageParams.noCondition=true;
			}
			if(pageParams.showResult){
				tabsDown();
			}
		})
		$(document).off('click.newsearch','.condition-chip dd').on('click.newsearch','.condition-chip dd',function(){
			var type=$(this).text();
			if(pageParams.label=='person'){
				datas=pageParams.personCondition;
			}else if(pageParams.label=='vehicle'){
				datas=pageParams.carCondition;
			}else if(pageParams.label=='case'){
				datas=pageParams.caseCondition;
			}
			datas.title=type;
			_.each(pageParams.enumDataMap, function (item) {
				if(item.title==type){
					datas.values=item.value;
				}
			})
			var tmpl_string=$('#condition-tpl').html();
			var searchItem=$(this).parents('.search-item');
			$(this).parents('.search-item').html( _.template(tmpl_string)(datas));
			if($(this).text()=='报案日期'){				
				$('#case-date',searchItem).show();			
				$('.condition-value .select-chip',searchItem).hide();
				//按周期模糊搜索
			    $('input[name=casedate]',$page).daterangepicker({
			        format:'YYYY-MM-DD',
			        applyClass: 'btn-primary',
			        clearClass: 'btn-primary'
			    }, function(start, end, label, action) {
			       //TODO
			       pageParams.casedate=[];
			       var dateString=$('#case-date').val();
                    if($(event.target).hasClass('applyBtn')){
                        pageParams.casedate.push(start.format('YYYY-MM-DD'));
                        pageParams.casedate.push(end.format('YYYY-MM-DD'));
                    }
			    }).on('clear.daterangepicker', function(){
					pageParams.casedate=[];
			        $(this).val('');
			    });
			}
		})
		$(document).off('click.newsearch','.condition-card .add-condition').on('click.newsearch','.condition-card .add-condition',function(){
			var tmpl="<div class='search-item'>"+getTmplString()+'</div>';
			$('.condition-card').append(tmpl);
			if(pageParams.showResult){
				tabsDown();
			}
            mining.utils.serverLog(554,'增加条件');
		})
		//检索按钮事件
		$(document).off('click.newsearch','.super-search-btn button').on('click.newsearch','.super-search-btn button',function(){
			var content=$('.key-word').val();
			if(content!=''){
				var data={};
				var conditions={};
				if(!pageParams.noCondition){
					var condition=[];
					conditions.label=pageParams.label;
					$('.condition-card .search-item').each(function(){
						var result={};
						var title=$(this).find('.condition-chip .select-title span').text();
						var item=keyMap(title);
						result.key=item.key;
						result.type=item.type;
						if(title=='报案日期'){
							result.value=pageParams.casedate;
						}else{
							result.value=$(this).find('.condition-value .select-title span').text();
						}
						if(result.value.length>0)
							condition.push(result);
					});
					conditions.relation='or';
					conditions.condition=condition;
					data.conditions=JSON.stringify(conditions);
				}
				data.type=pageParams.type;
				data.content=content;
				pageParams.postData=data;
				pageParams.pageNo=1;
				showResult();
			}else{
				$('.search-keyword').addClass('animat-focus').one('webkitAnimationEnd',function(){
					$(this).removeClass('animat-focus');
				});
			}
			mining.utils.serverLog(555,content);
		})
		//enter监听
		$(document).off('keydown.newsearch','body').on('keydown.newsearch','body',function(e){
			if(e.keyCode=='13' && $('.nav-search').hasClass('active')){
				$('.search-keyword i').click();
			}
		})
		$(document).off('click.newsearch','.clear-conditions').on('click.newsearch','.clear-conditions',function(){
			renderCondition();
			pageParams.noCondition=true;
			$('.condition-card').hide();
			$('.legal-case .select-title span').text('请选择');
			if(pageParams.showResult){
				tabsDown();
			}
			mining.utils.serverLog(552);
		})
		$(document).off('click.newsearch','.remove-condition').on('click.newsearch','.remove-condition',function(){
			var length=$('.condition-card .search-item').length;
			if(length>1){
				$(this).parents('.search-item').remove();
			}
			if(pageParams.showResult){
				tabsDown();
			}
            mining.utils.serverLog(554,'删除条件');
		})
		$(document).off('click.newsearch','.super-search-title').on('click.newsearch','.super-search-title',function(){
			var $icon=$(this).find('i');
			if($icon.hasClass('select-title-rotate')){
				$icon.removeClass('select-title-rotate');
				$('.super-card').hide();
				pageParams.noCondition=true;
			}else {
				$icon.addClass('select-title-rotate');
				$('.super-card').show();
				pageParams.noCondition=false;
			}
			if(pageParams.showResult){
				tabsDown();
			}
			mining.utils.serverLog(551);
		})
	}
	/**
	 * [initLayout 初始化布局]
	 * @return {[type]} [description]
	 */
	function initLayout(){
		$searchCard.css({'-webkit-transform':'translateX('+pushLeft+'px)'});
		$resultCard.css({'-webkit-transform':'translateX('+pushRight+'px)'});
	}
	function showResult(){
		$('.search-container > div').addClass('bg-white');
		$('.super-search-title').addClass('bg-white');
		$('.search-label').addClass('border-none');
		swichTabs('down');
		$searchCard.css({'-webkit-transform':'translateX(0)'});
		$resultCard.addClass('show');
		$resultCard.css({'-webkit-transform':'translateX(0)'});
		pageParams.showResult=true;
		$('.pages').html('');//清除分页
		renderResult();
	}
	function hideResult(){
		$('.search-container > div').removeClass('bg-white');
		$('.super-search-title').removeClass('bg-white');
		$('.search-label').removeClass('border-none');
		swichTabs('up');
		$resultCard.removeClass('show');
		initLayout();
		pageParams.showResult=false;
	}
	function swichTabs(type){
		var $superSearch=$('.super-search');
		var $tabs=$('.search-tabs');
		if(type=='down'){
			$superSearch.addClass('super-search-up');
			tabsDown();
		}else if (type=='up'){
			$superSearch.removeClass('super-search-up');
			$tabs.css({'transform':'translateY(0px)'});
		}
	}
	function tabsDown(){
		var down=$('.super-search').height()+20;
		$('.search-tabs').css({'transform':'translateY('+down+'px)'});
	}
	function conditionTitleMap(key){
		var map={
			'PERSON_xb':{
				'title':'性别'
			},
			'PERSON_mz':{
				'title':'民族'
			},
			'PERSON_ZDRYLBBJ':{
				'title':'重点人类型'
			},
			'VEHICLE_cllxmcS':{
				'title':'车辆类型'
			},
			'VEHICLE_csysmc':{
				'title':'颜色'
			},
			'CASE_ajlymc':{
				'title':'案件来源'
			}
		}
		return map[key];
	}
	function keyMap(key){
		var map={
			'性别':{
				'key':'PERSON_xb',
				'type':'string'
			},
			'民族':{
				'key':'PERSON_mz',
				'type':'string'
			},
			'重点人类型':{
				'key':'PERSON_zdrlx',
				'type':'string'
			},
			'车辆类型':{
				'key':'VEHICLE_cllxmcS',
				'type':'string'
			},
			'颜色':{
				'key':'VEHICLE_csysmc',
				'type':'string'
			},
			'案件来源':{
				'key':'CASE_ajlymc',
				'type':'string'
			},
			'报案日期':{
				'key':'CASE_barq',
				'type':'date'
			}
		}
		return map[key];
	}
	
	function selectUp(){
		var $title=$('.select-title');
		var $iconAll=$title.find('i');
		var $option=$('.select-option');
		$option.hide();
		$iconAll.removeClass('select-title-rotate');
	}

    return {
    	init: initPage
    }
});