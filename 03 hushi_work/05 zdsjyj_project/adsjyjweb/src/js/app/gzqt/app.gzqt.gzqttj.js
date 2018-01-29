app.gzqt.gzqttj = {
	init: function() {
		app.gzqt.gzqttj.listData();
		app.gzqt.gzqttj.initBtn();
	},
	listData: function() {
		app.loading.show();
		app.api.gzqt.gzqttj({
			success: function(result) {
				app.loading.hide();
				var template = $('#tmpl-list-gzqttj-search').html();
				var html = $m.tmpl(template, result);
				$('#list-gzqttj-search').html(html);
			}
		});
	},
	initBtn: function() {
		$('#gzqttj-btn-refresh').on('click', function() {
			app.gzqt.gzqttj.listData();
		});
	}
};
