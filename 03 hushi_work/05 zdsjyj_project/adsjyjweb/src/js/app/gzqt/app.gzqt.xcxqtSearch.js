app.gzqt.xcxqtSearch = {
	qtbh: null,
	url: 'pages/gzqt/xcxqtview.html',
	close: function() {
		app.gzqt.xcxqtSearch.clear();
		$m.page.closePage(app.gzqt.xcxqtSearch.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.xcxqtSearch.callback = null;
		app.gzqt.xcxqtSearch.vehicles = null;
	},
	init: function() {
		$('#window-xcxqt-addWindow').addClass('popIn');
		$('#window-xcxqt-addWindow .btn-window-close').on('click', function() {
			$('#window-xcxqt-addWindow').addClass('popOut');
			app.gzqt.xcxqtSearch.close();

		});
		app.gzqt.xcxqtSearch.initSearchForm(1, 10);
	},

	initSearchForm: function(pageIndex, pageSize) {

		app.api.gzqt.xcxqtview({
			data: {
				qtbh: app.gzqt.xcxqtSearch.qtbh
			},
			success: function(result) {
				var data = result.msg;
				console.info(data);
				$("#xcxqt_list").empty();

				$("#xcxqt_list").append(
					"<tr>" +
					"<td>" + data.zdqtbh + '</td>' +
					"<td>" + data.qtmc + "</td>" +
					"<td>" + data.qtlb + "</td>" +
					"<td>" + data.qtgm + "</td>" +
					"<td>" + data.clsj + "</td>" +
					"<td>" + data.zysq + "</td>" +
					"<td>" + data.csyy + "</td>" +
					"<td>" + data.cjdwdm + "</td>" +
					"</tr >"
				);

			}
		});
	},

};
