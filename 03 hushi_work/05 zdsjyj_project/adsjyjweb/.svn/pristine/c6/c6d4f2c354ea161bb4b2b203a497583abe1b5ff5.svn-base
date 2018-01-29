app.qtwj.viewWindow = {
	data: {},
	url: 'pages/qtwj/viewWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.qtwj.viewWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.qtwj.viewWindow.clear();
		$m.page.closePage(app.qtwj.viewWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-qtwj-viewWindow').addClass('popIn');
		$('#window-qtwj-viewWindow .btn-window-close').on('click', function() {
			$('#window-qtwj-viewWindow').addClass('popOut');
			app.qtwj.viewWindow.close();
		});

		app.qtwj.viewWindow.initData();
	},
	clear: function() {
		app.qtwj.viewWindow.data = {};
		app.qtwj.viewWindow.callback = null;
	},
	initData: function() {
		var template = $('#tmpl-view-qtwj-info').html();
		var html = $m.tmpl(template, app.qtwj.viewWindow.data);
		$('#view-qtwj-info').html(html);
	}
}
