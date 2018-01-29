app.func.excelWindow = {
	url: 'pages/function/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.func.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.func.excelWindow.clear();
		$m.page.closePage(app.func.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-func-excelWindow').addClass('popIn');
		$('#window-func-excelWindow .btn-window-close').on('click', function() {
			$('#window-func-excelWindow').addClass('popOut');
			app.func.excelWindow.close();
		});
		app.func.excelWindow.initAppSelect();
		// 文件上传按钮
		app.func.excelWindow.initFileUpload();

	},
	clear: function() {
		app.func.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-func').fileupload({
			url: '/api/function/importFromExcel',
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
				app.func.search.listPager.refresh();
				app.func.excelWindow.close();
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
			},
			submit: function(e, data) {
				if (!$('#func-excel-appId').val()) {
					app.alert("请选择应用");
					return false;
				}
				data.formData = {
					appId: $('#func-excel-appId').val()
				};
			}
		});
	},
	initAppSelect: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].appId] = result.datas[i].name;
				}
				app.select.init('#func-excel-appId', nameMap, {
					label: '请选择应用',
					value: ''
				});
			}
		});
	}
};
