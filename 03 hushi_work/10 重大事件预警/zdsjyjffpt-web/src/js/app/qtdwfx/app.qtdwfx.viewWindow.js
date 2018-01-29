app.qtdwfx.viewWindow = {
	data: {},
	url: 'pages/qtdwfx/viewWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.qtdwfx.viewWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.qtdwfx.viewWindow.clear();
		$m.page.closePage(app.qtdwfx.viewWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-qtdwfx-viewWindow').addClass('popIn');
		$('#window-qtdwfx-viewWindow .btn-window-close').on('click', function() {
			$('#window-qtdwfx-viewWindow').addClass('popOut');
			app.qtdwfx.viewWindow.close();
		});

		app.qtdwfx.viewWindow.initData();
	},
	clear: function() {
		app.qtdwfx.viewWindow.data = {};
		app.qtdwfx.viewWindow.callback = null;
	},
	initData: function() {
		var template = $('#tmpl-view-qtdwfx-info').html();
		var html = $m.tmpl(template, app.qtdwfx.viewWindow.data);
		$('#view-qtdwfx-info').html(html);
	}
};
