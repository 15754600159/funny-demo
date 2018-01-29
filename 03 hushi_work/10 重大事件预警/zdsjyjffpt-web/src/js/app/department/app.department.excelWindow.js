app.department.excelWindow = {
	url: 'pages/department/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.department.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.department.excelWindow.clear();
		$m.page.closePage(app.department.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-department-excelWindow').addClass('popIn');
		$('#window-department-excelWindow .btn-window-close').on('click', function() {
			$('#window-department-excelWindow').addClass('popOut');
			app.department.excelWindow.close();
		});

		// 文件上传按钮
		app.department.excelWindow.initFileUpload();

	},
	clear: function() {
		app.department.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-department').fileupload({
			url: '/api/department/importFromExcel',
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
				app.department.search.listPager.refresh();
				app.department.excelWindow.close();
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
