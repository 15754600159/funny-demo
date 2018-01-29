app.gzqt.view = {
	id: null,
	url: 'pages/gzqt/gzqtview.html',

	close: function() {
		app.gzqt.view.clear();
		$m.page.closePage(app.gzqt.view.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.view.callback = null;
		app.gzqt.view.vehicles = null;
	},

	init: function() {
		// $m('#form-gzqt-update').setFormValues(app.gzqt.update.obj);
		// $('#user-update-clsj').val(app.gzqt.update.obj.clsj);
		app.time.init();
		$('#window-gzqt-viewWindow').addClass('popIn');
		$('#window-gzqt-viewWindow .btn-window-close').on('click', function() {
			$('#window-gzqt-viewWindow').addClass('popOut');
			app.gzqt.view.close();
		});

		$('input,select,textarea', $('#form-gzqt-view')).prop('disabled', 'disabled');
		app.gzqt.view.initData();

	},
	initData: function() {
		app.api.gzqt.view({
			data: {
				id: app.gzqt.view.id
			},
			success: function(result) {
				console.log(result);
				$m('#form-gzqt-view').setFormValues(result.msg);
				//	$m('#form-gzqt-qtlb').val(result.msg.qtlb);
				app.gzqt.update.initForm();
			},
			error: app.api.error
		});
	},
};
