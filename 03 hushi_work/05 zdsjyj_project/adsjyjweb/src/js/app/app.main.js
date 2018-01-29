app.main = {
	open: function() {
		$m.page.loadPage({
			url: 'pages/main.html',
			effect: 'fade',
			container: 'container-wrapper'
		});
	},

	init: function() {
		app.menu.initSidebarMenu();

		// 判断是否页面返回而来
		var from = sessionStorage.getItem("from");
		if (from === 'gzqtrygl') {
			sessionStorage.setItem("from", ""); //清除值
			$m.page.openPage({
				url: 'pages/gzqt/gzqtgl.html',
				container: 'page-content-wrapper',
				effect: 'fade'
			});
			return;
		} else if (from == 'gzqtwgzrygl') {
			sessionStorage.setItem("from", ""); //清除值
			$m.page.openPage({
				url: 'pages/gzqt/gzqtgl.html',
				container: 'page-content-wrapper',
				effect: 'fade'
			});
			return;
		}

		// 默认显示第一个菜单的页面
		$('#sidebar-menu>li:first-child>.sidebar-menu-item').click();
	},

	// getQueryString: function(name) {
	// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	// 	var r = window.location.search.substr(1).match(reg);
	// 	if (r != null) return unescape(r[2]); return null;
	// },

};
