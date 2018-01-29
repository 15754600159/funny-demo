app.gzqt.gzqtryview = {
	id: null,
	url: 'pages/gzqt/gzqtryview.html',

	close: function() {
		app.gzqt.gzqtryview.clear();
		$m.page.closePage(app.gzqt.gzqtryview.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.gzqtryview.callback = null;
		app.gzqt.gzqtryview.vehicles = null;
	},

	init: function() {

		$('#window-gzqtry-viewWindow').addClass('popIn');
		$('#window-gzqtry-viewWindow .btn-window-close').on('click', function() {
			$('#window-gzqtry-viewWindow').addClass('popOut');
			app.gzqt.gzqtryview.close();
		});

		$('input,select,textarea', $('#form-gzqtry-view')).prop('disabled', 'disabled');
		app.gzqt.gzqtryview.initData();

	},

	initData: function() {
		app.api.gzqt.gzqtryview({
			data: {
				id: app.gzqt.gzqtryview.id
			},
			success: function(result) {
				console.log(result);
				$m('#form-gzqtry-view').setFormValues(result.msg);
			},
			error: app.api.error
		});
	}
};
