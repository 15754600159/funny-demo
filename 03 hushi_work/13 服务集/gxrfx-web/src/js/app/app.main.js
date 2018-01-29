app.main = {
	open: function() {
		$m.page.loadPage({
			url: 'pages/gxrfx/index.html',
			effect: 'fade',
			container: 'container-wrapper'
		});
	},

	init: function() {
		app.menu.initSidebarMenu();

	},


};
