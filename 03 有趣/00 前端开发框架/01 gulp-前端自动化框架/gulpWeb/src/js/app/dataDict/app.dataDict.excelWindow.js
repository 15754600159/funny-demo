app.dataDict.excelWindow = {
	url: 'pages/dataDict/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.dataDict.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.dataDict.excelWindow.clear();
		$m.page.closePage(app.dataDict.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-dataDict-excelWindow').addClass('popIn');
		$('#window-dataDict-excelWindow .btn-window-close').on('click', function() {
			$('#window-dataDict-excelWindow').addClass('popOut');
			app.dataDict.excelWindow.close();
		});

		// 文件上传按钮
		app.dataDict.excelWindow.initFileUpload();

	},
	clear: function() {
		app.dataDict.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-dataDict').fileupload({
			url: '/api/dataDict/importFromExcel',
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
				app.dataDict.search.listPager.refresh();
				app.dataDict.excelWindow.close();
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
