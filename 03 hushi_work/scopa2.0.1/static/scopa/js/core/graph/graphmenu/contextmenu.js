define(function(require, module, exports){
    					
	/**
	 * @name ContextMenu
	 * @class Plugin for right-click context menus.
	 * @requires jquery
	 */
	var $ = require('jquery');
	
	(function($) {
		var $menu, trigger, hash;
		var defaults = {
				eventPosX: 'pageX',
				eventPosY: 'pageY',
				onContextMenu: null,
				onShowMenu: null,
				interval: 18	//自传一圈用时
	 		}

		$.fn.contextMenu = function(id, options) {
			$menu = $('#graphMenu');
			if (!$menu) {
				// Create singleton menu
				$menu = $('<div id="graphMenu" class="graphMenu"></div>').appendTo('body');
			}
			$menu.hide().bind('click', function(e) {
				e.stopPropagation();
			}).on('selectstart', function(){
				return false;
			});
			hash = hash || [];
			hash.push({
				id : id,
				bindings: options.bindings || {},
				onContextMenu: options.onContextMenu || defaults.onContextMenu,
				onShowMenu: options.onShowMenu || defaults.onShowMenu,
				eventPosX: options.eventPosX || defaults.eventPosX,
				eventPosY: options.eventPosY || defaults.eventPosY
			});

			var index = hash.length - 1;
			$(this).bind('contextmenu', function(e) {
				// Check if onContextMenu() defined
				var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
				if (bShowContext) display(index, this, e, options);
				return false;
			});
			return this;
		}

		
			
		var display = function(index, trigger, e, options) {
			var cur = hash[index];
			if($('#graphMenu').size() > 0){
				$menu = $('#graphMenu');
			}
			//menu.html($('#'+cur.id)[0].innerHTML);
			if (!!cur.onShowMenu) $menu = cur.onShowMenu(e, $menu);
			if(mining.utils.isEmpty($menu) || mining.utils.isEmpty($menu.html()))return false;
			
			$.each(cur.bindings, function(action, func) {
				var selector = '[action=' + action + ']';
				
				$menu.off('click', selector).on('click', selector, function(){
					hide();
					if(!$(this).hasClass('disabled'))func($(this));
				})
			});
			
			$('.graphmenu-sub',$menu).css({'display':'block', 'opacity':'0', 'z-index':10}).transform('scale(1)');
			setTimeout(function(){
				$('.graphmenu-sub',$menu).transform('scale(0.5)').css('z-index',1);
				setTimeout(function(){
					$('.graphmenu-sub',$menu).css({'opacity':'1'});
				}, 200);
			}, 200);
			
			$('.graphmenu-sub',$menu).transform('transform .1s linear', 'transition');
			
			$menu.css({
				'left': e[cur.eventPosX],
				'top': e[cur.eventPosY], 
				'display': 'block'
			});
			$menu.transform('scale(1)');
			
			//event
			$('.graphmenu-main .graphmenu-btn',$menu).off('mouseover').on('mouseover', function(){
				var _submenu = $(this).attr('submenu'),
					_$sub = $('.graphmenu-sub[for='+_submenu+']',$menu);
				
				$('.graphmenu-sub',$menu).not(_$sub).transform('scale(0.5)').css('z-index',1);
				if($(this).hasClass('disabled') || _$sub.size() < 1){
					return;
				}
				_$sub.transform('scale(1)').css('z-index',10);
			});
			$('#graphMenu').on('click', hide);
			$(document).one('click', hide);
		}
		
		$(document).on('mouseleave', '#graphMenu', function(){
			$('.graphmenu-sub',$menu).transform('scale(0.5)').css('z-index',1);
		});

		var hide = function () {
			$menu.transform('scale(0)');
		}

		// Apply defaults
		$.contextMenu = {
			defaults : function(userDefaults) {
				$.each(userDefaults, function(i, val) {
					if (typeof val == 'object' && defaults[i]) {
						$.extend(defaults[i], val);
					}else{
						 defaults[i] = val;
					}
				});
			}
		}
	})(jQuery);
});