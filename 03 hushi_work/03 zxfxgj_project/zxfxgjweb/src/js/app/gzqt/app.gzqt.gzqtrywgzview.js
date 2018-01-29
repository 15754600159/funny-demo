app.gzqt.gzqtrywgzview = {
	id: null,
	url: 'pages/gzqt/gzqtrywgzview.html',

	close: function() {
		app.gzqt.gzqtrywgzview.clear();
		$m.page.closePage(app.gzqt.gzqtrywgzview.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.gzqtrywgzview.callback = null;
		app.gzqt.gzqtrywgzview.vehicles = null;
	},

	init: function() {

		$('#window-gzqtrywgz-viewWindow').addClass('popIn');
		$('#window-gzqtrywgz-viewWindow .btn-window-close').on('click', function() {
			$('#window-gzqtrywgz-viewWindow').addClass('popOut');
			app.gzqt.gzqtrywgzview.close();
		});

		$('input,select,textarea', $('#form-gzqtrywgz-view')).prop('disabled', 'disabled');
		app.gzqt.gzqtrywgzview.initData();
		app.gzqt.gzqtrywgzSearch.init();

	},

	initData: function() {
		app.api.gzqt.gzqtrywgzview({
			data: {
				id: app.gzqt.gzqtrywgzview.id
			},
			success: function(result) {
				console.log(result);
				$m('#form-gzqtrywgz-view').setFormValues(result.msg);
			},
			error: app.api.error
		});
	}
};
