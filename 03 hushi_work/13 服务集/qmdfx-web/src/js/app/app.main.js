app.main = {
	open: function() {
		$m.page.loadPage({
			url: 'pages/qmdfx/index.html',
			effect: 'fade',
			container: 'container-wrapper'
		});
	},

	init: function() {
		app.menu.initSidebarMenu();

	},


};
