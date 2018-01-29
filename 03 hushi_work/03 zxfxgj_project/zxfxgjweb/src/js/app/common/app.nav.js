app.nav = {
	toPath: function(path, data) {
		var to = path.split('/')[0];
		$('#nav-menu .item.active').removeClass('active');
		$('#nav-' + to).addClass('active');
		app[to].navTo(path, data);
	},
	toPage: function(pageUrl) {
		console.log(pageUrl);
		$m.page.loadPage({
			url: pageUrl,
			effect: 'fade',
			container: 'page-content-wrapper'
		});
	},
	toHome: function() {
		$('#nav-menu .item.active').removeClass('active');
		$m.page.loadPage({
			url: 'pages/home/index.html',
			effect: 'fade',
			cache: true
		});
	}
};
