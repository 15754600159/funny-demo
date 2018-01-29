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

	},


};
