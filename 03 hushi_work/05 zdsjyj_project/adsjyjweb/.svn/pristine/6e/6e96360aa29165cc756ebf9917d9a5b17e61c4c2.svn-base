app.menu = {
	sidebarMenuData: [{
		name: '组织管理',
		code: 'department',
		page: 'pages/department/index.html'
	}, {
		name: '用户管理',
		code: 'user',
		page: 'pages/user/index.html'
	}, {
		name: '角色管理',
		code: 'role',
		page: 'pages/role/index.html'
	}, {
		name: '权限管理',
		code: 'userRole',
		page: 'pages/userRole/index.html'
	}, {
		name: '功能管理',
		code: 'function',
		page: 'pages/function/index.html'
	}, {
		name: '系统应用',
		code: 'application',
		page: 'pages/application/index.html'
	}, {
		name: '数据字典',
		code: 'dataDict',
		page: 'pages/dataDict/index.html'
	}, {
		name: 'demo',
		code: 'dataDict',
		page: 'pages/temp/add.html'
	}],
	getSidebarMenu: function() {
		var result = [];

		//var functions = app.user.functions || [];

		var menus = app.menu.sidebarMenuData;
		var menu;
		var i;
		var l = menus.length;
		for (i = 0; i < l; i++) {
			menu = menus[i];
			//if (functions.indexOf(menu.code) > -1) {
			result.push(menu);
			//}
		}
		return result;
	},
	initSidebarMenu: function() {
		// 菜单内容填充
		// var menuData = app.menu.getSidebarMenu();
		// var template = $('#tmpl-sidebar-menu').html();
		// var html = $m.tmpl(template, menuData);
		// $('#sidebar-menu').html(html);
		$(document).ready(function() {
			var trigger = $('.hamburger'),
				overlay = $('.overlay'),
				isClosed = true;

			trigger.click(function() {
				hamburger_cross();
			});
			$("nav ul li").on('click', function() {
				if ($(this).children(".sencend-menu").is(':hidden')) {
					$(this).children(".sencend-menu").animate({
						height: 'show'
					}, 400)
						//siblings遍历sencend-menu的元素
						.end().siblings().find(".sencend-menu").hide(400);
				} else {
					$(this).children(".sencend-menu").animate({
						height: 'hide'
					}, 400)
						.end().siblings().find(".sencend-menu").hide(400)
						.end().siblings().find(".thired-menu").hide(400);;
				}

			});
			var thist = $('.sencend-menu').children('li');
			$(thist).on('click', function() {
				// console.info($(this).children(".thired-menu").is(':hidden'))
				if ($(this).children(".thired-menu").is(':hidden')) {
					$(this).children(".thired-menu").animate({
						height: 'show'
					}, 400)
						//siblings遍历thired-menu的元素
						.end().siblings().find(".thired-menu").hide(400);
				} else {
					$(this).children(".thired-menu").animate({
						height: 'hide'
					}, 400)
						.end().siblings().find(".thired-menu").hide(400);
				}
			})
			$('.sencend-menu').click(function(e) {
				e.stopPropagation();
			});
			$('.thired-menu').click(function(e) {
				e.stopPropagation();
			});

			function hamburger_cross() {

				if (isClosed == true) {
					overlay.hide();
					trigger.removeClass('is-open');
					trigger.addClass('is-closed');
					isClosed = false;
				} else {
					overlay.show();
					trigger.removeClass('is-closed');
					trigger.addClass('is-open');
					isClosed = true;
				}
			}

			$('[data-toggle="offcanvas"]').click(function() {
				$('#container-wrapper').toggleClass('toggled');
			});
		});

		// 菜单点击事件
		$('#sidebar-menu').on('click', '.sidebar-menu-item', function() {
			var $menu = $(this);
			var page = $menu.data('page');
			if (page) {
				app.nav.toPage(page);
			}
		});

		$('.sencend-menu').on('click', '.sidebar-menu-item', function() {
			var $menu = $(this);
			var page = $menu.data('page');
			// console.log(page);
			if (page) {
				app.nav.toPage(page);
			}
		});

		$('.sencend-menu .thired-menu').on('click', '.sidebar-menu-item', function() {
			var $menu = $(this);
			var page = $menu.data('page');
			// console.log(page);
			if (page) {
				app.nav.toPage(page);
			}
		});

	}

};
