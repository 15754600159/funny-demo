define(function(require) {
	var $page = $('.page-style');
	require('pagination');
	var $copy = require('copy');
	var init = function(){
		renderIconAction();
		eventAction();
	}
	var getTemplateHtml = function(type, arg){
		switch(type){
			case 'iconsFont':
				var data = arg,
					htmlArr = [];
				$.each(data, function(key,value){
					htmlArr.push('<div class="item-box pull-left">');
					htmlArr.push('<div class="item-box-title">' + value.typeName + '<i class=""></i></div>');
					htmlArr.push('<div class="item-box-des paragraph-retract"></div>');
					htmlArr.push('<ul class="icons-list">');
					$.each(value.iconData, function(i,n){
						htmlArr.push('<li class="tag-current icon-classname"><span class="' + n.iconEn + '"></span><span class="font-txt iconEn hidden">' + n.iconEn + '</span><span class="font-txt">' + n.iconName + '</span></li>');
					});
					htmlArr.push('</ul>');
					htmlArr.push('</div>');
				});
				return htmlArr.join('');
				break;
			default:
				break;
		}
	}
	var renderIconAction = function(){
		var iconNameObj = require('./icons'),
			iconsHtml = getTemplateHtml('iconsFont',iconNameObj);
		$('.icons-box .panels-box',$page).html(iconsHtml);
		$('.icons-box .panels-box .icon-classname',$page).each(function(){
			$copy.init({
    	       	item: $(this),
    	       	content: $(this).find('.font-txt.iconEn'),
    	       	callback: function(data){
    		       $dialog.alert('复制成功！','success');
    	       	}
            });
		});
		
	}
	var eventAction = function(){
		$('select.btn-select-box').select2();
	}
	return {
        init: init
    }
});