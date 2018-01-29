define(function(require){
	var $page = $('.page-file'),
    	defaultConfig = {
	    	snapshot: null,
	    	readyCallback: null,
	    	clickCallback: null,
	    	dblclickCallback: null,
	    	delCallback: null
	   	},
		readyCallback = null,
		clickCallback = null,
		delCallback = null,
		// fileSnapshot,
		$fileside,
        itemTabData = {};

	/* 初始化档案列表 */
    var initFileList = function(config){
    	config = $.extend({}, defaultConfig, config);
		readyCallback = config.readyCallback;
		clickCallback = config.clickCallback;
		dblclickCallback = config.dblclickCallback;
		delCallback = config.delCallback;
		$fileside = $('.fileside',$page);
        itemTabData = {};
    }

    var getTemplateHtml = function(type, obj){
    	switch(type){
    		case 'fileItem':
                var itemId = '';
                if(obj.itemType == '2'){
                    itemId = obj.itemData.label.id;
                }else{
                    itemId = obj.itemData.gid;
                }
				return ['<li class="item disselect' + (itemId == itemTabData.current ? ' active' : '') + '" gid="' + itemId + '" data-item-type="' + obj.itemType + '" serverLog="' + obj.serverLog + '">',
    						'<div class="text ellipsis" title="' + obj.itemTitle + '">' + obj.itemTitle + '</div>',
    						'<a class="removefile" delServerLog="' + obj.delServerLog + '" href="javascript:;" title="移除"><span class="scopaicon scopaicon-guanbi"></span></a>',
    					'</li>'].join('');
    			break;
    		default:
    			break;
    	}
    }

    var initResultList = function(data){
    	$('.itemlist', $fileside).empty();
        $('.filelist .title b',$fileside).text('0');
        $('.filelist .list-title b',$fileside).text('0');
    	$('.fileitems',$fileside).mCustomScrollbar({
			theme: 'minimal'
		});
        $('.filelist[type="group"]',$page).addClass('hidden');
        $('.filelist',$page).height('calc(100% / 2)');
        if(data){
            itemTabData = data;
            if(data.tabtype == '2'){
                $('.filelist[type="group"]',$page).removeClass('hidden');
                $('.filelist',$page).height('calc(100% / 3)');
                $.each(data.groupdata,function(k,v){
                    addItme(v,false,true);
                });
            }else{
                // $('.filelist[type="group"]',$page).addClass('hidden');
                // $('.filelist',$page).height('calc(100% / 2)');
            }
            $.each(data.filedata,function(k,v){
                addItme(v);
            });
            searchAction();
            initEvent();
            setTimeout(function(){
                $('.fileitems-box .itemlist .item[gid="' + itemTabData.current + '"]',$fileside).click();
            },300);
            
        }
    }

    var searchAction = function(argument) {
        var $searchBtn = $('.searchbox .searchbar-close',$fileside);
        $('.searchbox .searchbox-ipt',$fileside).val('');
        $searchBtn.addClass('hidden');
        $('.searchbox .searchbox-ipt',$fileside).on('keyup',function(e){
            var searchValue = $(this).val(),
                searchResult = [];
            if($.trim(searchValue).length > 0){
                $searchBtn.removeClass('hidden');
                $.each($('.fileitems-box .itemlist .item', $fileside),function(){
                    if($(this).text().indexOf(searchValue) > -1){
                        $(this).removeClass('hidden');
                    }else{
                        $(this).addClass('hidden');
                    }
                });
            }else{
                $('.fileitems-box .itemlist .item', $fileside).removeClass('hidden');
                $searchBtn.addClass('hidden');
            }
            mining.utils.serverLog(435,searchValue);
        });
        $searchBtn.off('click').on('click',function(){
            $('.searchbox .searchbox-ipt',$fileside).val('');
            $('.fileitems-box .itemlist .item', $fileside).removeClass('hidden');
            $searchBtn.addClass('hidden');
            mining.utils.serverLog(436);
        });
    }

    var clicktimer, isdblclick = false;
    var initEvent = function(){
    	$('.fileitems-box .itemlist', $fileside).off('click','.item').on('click','.item', function(){
			var param = $(this).data('data'),
                serverLog = $(this).attr('serverLog'),
                dataBoxId = $('.content-box').attr('gid'),
                logTitle = mining.mappingutils.getTitle(param),
                that = this;
			
			clearTimeout(clicktimer);
			$('.item.active', $fileside).removeClass('active');
			$(that).addClass('active');
			if(isdblclick && dblclickCallback){
				isdblclick = false;
				dblclickCallback({itemData:param,itemType:$(that).attr('data-item-type')});
				return;
			}
			isdblclick = true;
			clicktimer = setTimeout(function(){
				isdblclick = false;
                clickCallback({itemData:param,tabData:itemTabData,itemType:$(that).attr('data-item-type')});
			}, 300);
            if($(that).attr('data-item-type') == 2){
                showItem(param.label.id);
            }else{
                showItem(param.gid);
            }
            mining.utils.serverLog(serverLog,logTitle);
		}).on('selectstart', function(){
			return false;
		});
		
		$('.fileitems-box .itemlist', $fileside).off('click','.removefile').on('click','.removefile', function(e){
            mining.utils.stopBubble(e);
            var delServerLog = $(this).attr('delServerLog'),
                $item = $(this).parents('.item:first'),
                logTitle = mining.mappingutils.getTitle($item.data('data'));
			removeItem([$item]);
            mining.utils.serverLog(delServerLog,logTitle);
		});
    }

    var showItem = function(itemId){
		var $filelist = $('.filelist .itemlist',$fileside);
		$filelist.find('.item').removeClass('active');
		$filelist.find('.item[gid="' + itemId + '"]').addClass('active');
        var $item = $('.filelist .itemlist .item.active',$fileside);
        if($item.length > 0){
            $item.parents('.fileitems:first').mCustomScrollbar('scrollTo',$item);
        }
    }

    var addItme = function(item, isinit, isGroup){
        if(isGroup){
            var title = item.label.name,
                $filelist = $('.filelist[type="group"]',$fileside),
                $listCount = $('.filelist[type="group"] .title b',$fileside),
                dataObj = {
                    itemData: item,
                    itemTitle: title,
                    itemType: '2',
                    serverLog: 431,
                    delServerLog: 434
                };
            
            $filelist.find('.itemlist').append(getTemplateHtml('fileItem',dataObj)).children(':last').data('data', item);
            $listCount.html($('.filelist[type="group"] .item',$fileside).size());
            
            if(isinit){
                $filelist.find('.itemlist .item[gid="' + item.label.id + '"]',$filelist).click();
            }
        }else{
            if(item.key && item.key.indexOf('******') > -1)return;
            var title = mining.mappingutils.getTitle(item);
            var etype = mining.mappingutils.getType(item),
                $filelist = $('.filelist[type="' + etype + '"]',$fileside),//itemlist
                $listCount = $('.filelist[type="' + etype + '"] .title b',$fileside),
                dataObj = {
                    itemData: item,
                    itemTitle: title,
                    itemType: '1'
                },
                dataType = item.label,
                itemType = getItemType(etype,dataType,item);
            if(etype == 'entity'){
                dataObj.serverLog = 429;
                dataObj.delServerLog = 432;
            }else if(etype == 'relation'){
                dataObj.serverLog = 430;
                dataObj.delServerLog = 433;
            }
            if($('.itemlist[data-type="' + itemType + '"] .item[gid="' + item.gid + '"]',$filelist).length <= 0){
                $filelist.find('.itemlist[data-type="' + itemType + '"]').append(getTemplateHtml('fileItem',dataObj)).children(':last').data('data', item);
                $filelist.find('.list-title[data-type="' + itemType + '"] b').text($filelist.find('.itemlist[data-type="' + itemType + '"] .item').size());
                $listCount.html($('.filelist[type="' + etype + '"] .item',$fileside).size());
            }
            
            if(isinit){
                $('.itemlist[data-type="' + itemType + '"] .item[gid="' + item.gid + '"]',$filelist).click();
            }
        }
    }

    var getItemType = function(etype,dataType,item){
        var itemType = 'other';
        if(etype == 'entity'){
            if(dataType == 'person'){
                itemType = 'person';
            }else if(dataType == 'vehicle'){
                itemType = 'vehicle';
            }else if(dataType == 'case'){
                itemType = 'case';
            }else{
                itemType = 'other';
            }
        }else if(etype == 'relation'){
            if(item.hasOwnProperty('rule_ids')){
                itemType = 'indirect';
            }else{
                itemType = 'direct';
            }
        }
        return itemType;
    }

    var removeItem = function(items){
    	if(items.length < 1) return;
    	var openfile = false,
			dataArr = [],
			param;
			
    	$.each(items, function(i, n){
    		var $item = $(n),
                itemType = $item.attr('data-item-type');
    		param = $item.data('data');
    		dataArr.push(param);
    		
			if($item.hasClass('active'))openfile = true;
			$item.remove();
            if(itemType == '2'){
                var $filelist = $('.filelist[type="group"]',$fileside),
                    $listCount = $('.filelist[type="group"] .title b',$fileside);

                $listCount.html($('.filelist[type="group"] .item',$fileside).size());
            }else{
                var dataType = param.label,
                    etype = mining.mappingutils.getType(param),
                    itemType = getItemType(etype,dataType,param),
                    $filelist = $('.filelist[type="' + etype + '"]',$fileside),
                    $listCount = $('.filelist[type="' + etype + '"] .title b',$fileside);

                $filelist.find('.list-title[data-type="' + itemType + '"] b').text($filelist.find('.itemlist[data-type="' + itemType + '"] .item').size());
                $listCount.html($('.filelist[type="' + etype + '"] .item',$fileside).size());
            }
            
    	});
		if(openfile){
            if($('.itemlist .item', $fileside).length > 0){
                $('.item:first',$fileside).click();
            }//else if($('.filenavtabs .tab-panel',$page).length > 0){
                //$('.filenavtabs .tab-panel',$page).last().click();
            //}
            else{
                $('.content-box .filecontent-box').addClass('hidden');
                initResultList();
                $('.filenavtabs li[data-tabid="' + itemTabData.tabid + '"]',$page).remove();
                $('.toolbar .file-analyze, .toolbar .file-save, .toolbar .file-delete').addClass('hidden');
                $('.toolbar .file-tograph, .toolbar .file-tomap').addClass('disable');
            }
        }
		delCallback({itemData:dataArr,tabData:itemTabData});
    }

    var opListAction = function(data){
        initResultList(data);
        
    }

    return {
    	init: initFileList,
    	add: addItme,
    	del: removeItem,
    	show: showItem,
        refresh: opListAction
    }
});