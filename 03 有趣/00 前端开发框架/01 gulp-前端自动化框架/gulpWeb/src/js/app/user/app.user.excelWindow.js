app.user.excelWindow = {
	url: 'pages/user/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.user.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.user.excelWindow.clear();
		$m.page.closePage(app.user.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-user-excelWindow').addClass('popIn');
		$('#window-user-excelWindow .btn-window-close').on('click', function() {
			$('#window-user-excelWindow').addClass('popOut');
			app.user.excelWindow.close();
		});

		// 文件上传按钮
		app.user.excelWindow.initFileUpload();

	},
	clear: function() {
		app.user.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-user').fileupload({
			url: '/api/user/importFromExcel',
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
			autoUpload: true,
			messages: {
				maxNumberOfFiles: 'Maximum number of files exceeded',
				acceptFileTypes: '文件类型错误',
				maxFileSize: 'File is too large',
				minFileSize: 'File is too small'
			},
			done: function(e, data) {
				app.loading.hide();
				app.user.search.listPager.refresh();
				app.user.excelWindow.close();
			},
			always: function() {
				app.loading.hide();
			},
			progressall: function() {
				app.loading.show();
			},
			processalways: function(e, data) {
				app.loading.hide();
				var index = data.index;
				var file = data.files[index];
				if (file.error) {
					app.alert(file.error);
				}
			}
		});
	}
};
