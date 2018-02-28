app.main = {
	open: function() {
		$m.page.loadPage({
			url: 'pages/gztIndex/index.html',
			effect: 'fade',
			container: 'container-wrapper'
		});
	},

	init: function() {
		app.menu.initSidebarMenu();
	},

};
