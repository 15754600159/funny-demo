define(function(require, exports, module){
	
	/**
     * @name Search
     * @class 顶部搜索。
     */
    require('jqueryui');
    
    var requestUrl = {
			search: mining.baseurl.core + '/query/search'			//content  type: all,entity,relation,event,media
		},
		showModule = require('core/common/showelement');
    
	var $searchbox = $('.navbar .searchbox');
    var searchTmpl = ['<div class="quicksearch">',
    		'<div class="quicksearch-list"><div>',
    	'</div>'].join('');
    var isDrag = false;
    var doSearch = function(){
    	var content = $('[name=keywords]',$searchbox).val();
    	
    	if(mining.utils.isEmpty(content))return;
    	if($('.quicksearch', $searchbox).size() < 1){
    		$('.searchipt', $searchbox).after(searchTmpl);
    	}
    	
    	var $resultlist = $('.quicksearch-list',$searchbox);
    	
    	$('.searchipt', $searchbox).autocompleter('close');
    	$resultlist.html('<div class="quicksearch-item gray txtc loading"></div>');
    	$('.quicksearch', $searchbox).slideDown(300);
    	$ajax.ajax({
    		url: requestUrl.search,
    		data: {
    			content: content,
				type: 'all',
				pageSize: 20,
				pageNo: 1
    		},
    		success: function(data){
    			$('.loading,.gray',$resultlist).remove();
				if(mining.utils.isEmpty(data.record)){
					$resultlist.html('<div class="quicksearch-item gray txtc">未找到匹配项</div>');
    				return;
				}
				$resultlist.empty();
				$.each(data.record, function(i,n){
					var nodedata, title = svgicon = '';
					
					if($('.quicksearch-item',$resultlist).size() > 10) return;
					if(!mining.utils.isEmpty(n.e)){
						nodedata = n.e[0];
					}else if(!mining.utils.isEmpty(n.v)){
						nodedata = n.v[0];
					}
					title = mining.mappingutils.getTitle(nodedata);
					svgicon = mining.mappingutils.getGraphIcon(nodedata);
					if(nodedata.label == 'doc'){
						title = '标题：' + nodedata.filename;
						nodedata.photoUrl = staticUrl + '/scopa/images/core/entity_document.png';
					}
					$resultlist.append(['<div class="quicksearch-item" title="' + title + '">',
        				'<span class="quicksearch-thumb ' + mining.mappingutils.getType(nodedata) + '"><img class="txtt" src="' + (nodedata.photoUrl ? nodedata.photoUrl : svgicon) + '" _src="' + svgicon + '"></span>',
        				'<span class="quicksearch-content ellipsis" title="' + title + '">' + title + '</span>',
					'</div>'].join(''));
					$('.quicksearch-item:last',$resultlist).data('data', n);
				});
				mining.utils.checkImg($('.quicksearch-thumb img',$resultlist));
				$('.quicksearch-item',$resultlist).draggable({
					appendTo: 'body',
					helper: 'clone',
					cursor: 'move',
					containment: 'body',
					revert: 'invalid',
					zIndex: 2016,
					start: function(e, t) {
						isDrag = true;
					},
					drag: function(e, t) {},
					stop: function(e, t) {
						setTimeout(function(){isDrag = false;},100);
					}
				});
				if(data.record.length > 10){
					$resultlist.append(['<div class="quicksearch-item more" title="点击查看更多">',
        				'<span class="quicksearch-thumb">...</span>',
        				'<span class="quicksearch-content">点击查看更多</span>',
					'</div>'].join(''));
				}
    		},
    		error: function(data){
    			$resultlist.html('<div class="quicksearch-item gray txtc">搜索失败，请稍后重试！</div>');
    			seajs.log(data);
    		}
    	});
    	mining.utils.serverLog(5, content);//用户行为记录
    }
    $searchbox.on('mouseenter', function(){
    	$searchbox.addClass('active');
		$('.searchipt', $searchbox).show().animate({
    		'width': 180,
    		'padding-right': 40,
    		'opacity': 1
    	}, {
    		'duration': 300,
    		'easing': 'easeInQuad',
    		'complete': function(){
    			$(this).focus();
    		}
    	});
	});
    $searchbox.on('click', '.quicksearch-item', function(event){
    	if($(this).hasClass('more')){
    		mining.utils.hashChange('newsearch');
    		var maxtimecount = 180000, timecount = 0, timegap = 100;
			var searchtimer = setInterval(function(){
				if($('.page-newsearch .key-word').size() > 0 || timecount > maxtimecount){
					clearInterval(searchtimer);
					$('.page-newsearch .clear-conditions').click();
					$('.page-newsearch .key-word').val($('.searchipt', $searchbox).val());
					$('.page-newsearch .tab-item[data-value=all]').click();
					$('.page-newsearch .search-keyword i.iconfont').click();
				}
				/*if($('.homesearch .searchbar-input').size() > 0 || timecount > maxtimecount){
					clearInterval(searchtimer);
					$('.homesearch .searchbar-input').val($('.searchipt', $searchbox).val());
					$('.homesearch .searchtype [type=all]').click();
					$('.homesearch .searchbar-submit').click();
				}*/
				timecount += timegap;
			},timegap);
			mining.utils.serverLog(6, '点击查看更多');//用户行为记录
    	}else if(!mining.utils.isEmpty($(this).data('data'))){
    		var hash = 'graph', odlhash = $.hash();
    		
    		if(!mining.utils.isEmpty(odlhash)){
    			hash = odlhash.substr(odlhash.lastIndexOf('/')+1, odlhash.length);
    		}
    		if(hash != 'graph' && hash != 'map' && hash != 'file')hash = 'graph';
    		showModule.show($(this).data('data'), hash, event);
    		mining.utils.serverLog(6, $(this).attr('title'));//用户行为记录
    	}
		hideSearchBox();
		
	});
	var hideSearchBox = function(){
		$searchbox.removeClass('active');
		$('.quicksearch', $searchbox).slideUp(300);
    	$('.searchipt', $searchbox).show().animate({
    		'width': 23,
    		'padding-right': 10,
    		'opacity': 0.2
    	}, {
    		'duration': 300,
    		'easing': 'easeInQuad',
    		'complete': function(){
    			$(this).css({
		    		'display': 'block',
		    		'opacity': 0
		    	});
    		}
    	});
	}
    $(document).on('click', function(e){
    	if($('.searchipt', $searchbox).is(':hidden') || $(e.target).parents('.searchbox').size() > 0 || isDrag)return;
    	hideSearchBox();
    });
    
    require('autocompleter');
    var keywords = [
		   /* { 'value': 'one', 'label': 'one' },
		    { 'value': 'two', 'label': 'two' },
		    { 'value': 'three', 'label': 'three' }*/
		]
    $('.searchipt', $searchbox).autocompleter({
    	source: keywords,
    	focusOpen: false,
    	selectFirst: true
    }).on('keyup', function(e){
    	$('.quicksearch', $searchbox).slideUp(300);
    	if(e.keyCode == mining.keyCode.ENTER)doSearch();
    });
    $('.searchbtn', $searchbox).on('click', doSearch);
    
    //拖拽展示
    var interval;
    $('.navbar .nav-graph,.navbar .nav-map,.navbar .nav-file').droppable({
    	activeClass: 'drag-normal',
      	hoverClass: 'drag-hover',
      	drop: function( event, ui ) {
	  		var data = ui.draggable.data('data'),hash = '';
	  		
	  		if($(this).hasClass('nav-graph')){
	  			hash = 'graph';
	  		}else if($(this).hasClass('nav-map')){
	  			hash = 'map';
	  		}else if($(this).hasClass('nav-file')){
	  			hash = 'file';
	  		}
	  		clearTimeout(interval)
	  		interval = setTimeout(function(){
	  			showModule.show(data, hash);
	  		}, 100);
	  	}
    });
    $('.page-graph,.page-map,.page-file').droppable({
    	activeClass: 'drag-normal',
      	hoverClass: 'drag-hover',
      	drop: function( event, ui ) {
	  		var data = ui.draggable.data('data'),hash = '';
	  		
	  		if($('.page-graph').hasClass('active')){
	  			hash = 'graph';
	  		}else if($('.page-map').hasClass('active')){
	  			hash = 'map';
	  		}else if($('.page-file').hasClass('active')){
	  			hash = 'file';
	  		}
	  		clearTimeout(interval)
	  		interval = setTimeout(function(){
	  			showModule.show(data, hash, event);
	  		}, 100);
	  	}
    });
    
});