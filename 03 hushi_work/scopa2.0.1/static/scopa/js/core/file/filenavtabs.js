define(function(require){
	var $page = $('.page-file'),
    	defaultConfig = {
	    	snapshot: null,
	    	clickCallback: null
	   	},
	   	$tabWidth = 173,
	   	clickCallback = null,
        addCallback = null,
        delCallback = null,
	   	fileSnapshot,
        isDefault = true,
    	$navtab;

    var initNavTabs = function(config){
    	config = $.extend({}, defaultConfig, config);
    	fileSnapshot = config.snapshot || {};
    	if(mining.utils.isEmpty(fileSnapshot.navtabs)) fileSnapshot.navtabs = [];
    	clickCallback = config.clickCallback;
        addCallback = config.addCallback;
        delCallback = config.delCallback;
    	$navtab = $('.filenavtabs',$page);
    	initTabsList();
    }

    var initTabsList = function(){
    	$('.tabslist', $navtab).removeAttr('style').empty();
        $('.tabsmorelist',$navtab).empty();
        $.each(fileSnapshot.navtabs,function(k,v){
            addTab(v);
        });
		initEvent();
        $('.tabslist .tab-panel[data-tabid="' + fileSnapshot.current + '"]',$navtab).click();
    }

    var getTemplateHtml = function(type,obj){
    	switch(type){
    		case 'tabItem':
    			return ['<li gid="' + obj.gid + '" class="tab-panel' + (obj.tabId == fileSnapshot.current ? ' active' : '') + '" data-type="' + (obj.tabType) + '" data-tabid="' + obj.tabId + '">',
    						'<a href="javascript:" title="' + obj.tabTitle + '" class="tab-txt ellipsis">' + obj.tabTitle + '</a>',
    						'<a href="javascript:;" class="close" title="关闭"><span class="scopaicon scopaicon-guanbi"></span></a>',
    					'</li>'].join('');
    			break;
    		default:
    			break;
    	}
    }

    var initEvent = function(){
    	$navtab.off('click', '.tabslist .tab-panel').on('click', '.tabslist .tab-panel', function(){
            var itemData = $(this).data('data');
            var dataBoxId = $('.content-box').attr('tabid');
    		if($(this).hasClass('active') && (dataBoxId && itemData.tabid == dataBoxId)) return;
            showTab(itemData);
    		clickCallback(itemData);
    	});
        
    	$navtab.off('click', '.tabslist .tab-panel .close').on('click', '.tabslist .tab-panel .close', function(e){
    		mining.utils.stopBubble(e);
            var $panel = $(this).parents('li:first'),
    			data = $panel.data('data');
    		if($panel.hasClass('active')){
    			if($panel.prev().size() > 0){
	    			$panel.prev().click();
	    		}else if($panel.next().size() > 0){
	    			$panel.next().click();
	    		}//else if($('.fileside .itemlist .item',$page).length > 0){
                    //$('.fileside .itemlist .item',$page).first().click();
                //}
                else{
                    $('.content-box').removeAttr('gid').removeAttr('tabid');
                    $('.content-box .filecontent-box').addClass('hidden');
                    $('.toolbar .file-analyze, .toolbar .file-save, .toolbar .file-delete').addClass('hidden');
                    $('.toolbar .file-tograph, .toolbar .file-tomap').addClass('disable');
                }
    		}
            removeTab(data);
    	});
		$navtab.off('click', '.tabsmore').on('click', '.tabsmore', function(e){
            mining.utils.stopBubble(e);
            if($navtab.find('.tabsmorelist li').length > 0){
                $navtab.find('.tabsmorelist').css('display','block');
            }
		});
		$('body').on('click',function(e){
            $navtab.find('.tabsmorelist').css('display','none');
		});
        $navtab.off('click', '.tabsmorelist li').on('click', '.tabsmorelist li', function(e){
            var tabid = $(this).attr('data-tabid');
            $navtab.find('.tabslist .tab-panel[data-tabid="' + tabid + '"]').click();
        });
        $navtab.off('click', '.tabsmorelist li .close').on('click', '.tabsmorelist li .close', function(e){
            var tabid = $(this).parent().remove().attr('data-tabid');
            $navtab.find('.tabslist .tab-panel[data-tabid="' + tabid + '"] .close').click();
            mining.utils.stopBubble(e);
        });
    }

    var addTab = function(item, isinit){
    	var $tab = $('.tabslist .tab-panel[data-tabid="' + item.tabid + '"]',$navtab);
        var tabs = $('.tabslist',$navtab);
    	if($tab.size() < 1 && tabs.find('[data-tabid="' + item.tabid + '"]').length == 0){
            var dataObj = {
                    tabId: item.tabid,
                    tabTitle: item.tabtitle,
                    tabType: item.tabtype,
                    gid: item.current
                };
	    	tabs.append(getTemplateHtml('tabItem',dataObj)).children().last().data('data', dataObj);
            tabs.width($(tabs).find('.tab-panel').length * $tabWidth);
            var left = tabs.width() - $navtab.width();
            if(left>0){
                var w = tabs.find('li').outerWidth(),
                    n = Math.ceil(left/w),
                    m = Math.floor($navtab.width()/w);
                tabs.css('left','-'+ ( w * n ) +'px');
                $('.tabsmore',$navtab).width($navtab.outerWidth()-( w * m ));
            }
			$('.tabsmorelist',$navtab).append(getTemplateHtml('tabItem',dataObj)).children().last().data('data', dataObj);
            $('.tabsmore',$navtab).removeClass('hidden');
            
    	}
    	if(isinit){
            $('.tabslist .tab-panel[data-tabid="' + item.tabid + '"]',$navtab).click();
        }
    }

    var removeTab = function(data){
    	$navtab.find('.tabsmorelist li[data-tabid="'+data.tabId+'"]').remove();
    	$('.tabslist .tab-panel[data-tabid="' + data.tabId + '"]',$navtab).remove();
        var left = $('.tabslist',$navtab).position().left;
        if(left < 0){
            var w = $('.tabslist',$navtab).find('li').width();
            $('.tabslist',$navtab).css('left',( left + w ) +'px');
        }
        if($navtab.find('.tabsmorelist li').length == 0){
            $('.tabsmore',$navtab).addClass('hidden');
        }
        delCallback(data);
    }

    var showTab = function(data){
    	var $tabs = $('.tabslist .tab-panel',$navtab),
            $tab = $('.tabslist .tab-panel[data-tabid="' + data.tabId + '"]',$navtab),
            left = $('.tabslist',$navtab).position().left,
            w = $('.tabslist li',$navtab).outerWidth(),
            n = parseInt(-(left / w)),
            index = $tab.index();
        $tabs.removeClass('active');
    	$tab.addClass('active');
        if((index + 1) <= n){
            $('.tabslist',$navtab).css('left','-' + ( w * index ) + 'px');
        }
    }

    var opnavTab = function(data){
        fileSnapshot = data;
        initTabsList();
    }

    var changeTabData = function(data){
        console.log(data);
    }

    return {
    	init: initNavTabs,
    	add: addTab,
    	del: removeTab,
    	show: showTab,
        refresh: opnavTab,
        change: changeTabData
    }
});
