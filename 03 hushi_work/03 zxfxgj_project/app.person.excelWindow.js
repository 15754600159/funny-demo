app.person.excelWindow = {
	url: 'pages/person/excelWindow.html',
	callback: null,
	persons: null,
	open: function() {
		$m.page.openPage(app.person.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.person.excelWindow.clear();
		$m.page.closePage(app.person.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-person-excelWindow').addClass('popIn');
		$('#window-person-excelWindow .btn-window-close').on('click', function() {
			$('#window-person-excelWindow').addClass('popOut');
			app.person.excelWindow.close();
		});

		// 文件上传按钮
		app.person.excelWindow.initFileUpload();

		// 确定按钮
		$('#btn-ok-person-excel').on('click', function() {
			if (!app.person.excelWindow.persons) {
				app.alert('请选择文件');
				return;
			}
			app.person.excelWindow.callback(app.person.excelWindow.persons);
			app.person.excelWindow.close();
		});
	},
	clear: function() {
		app.person.excelWindow.callback = null;
		app.person.excelWindow.persons = null;
	},
	initFileUpload: function() {
		$('#fileupload-person').fileupload({
			url: '/api/personImport/import',
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
				app.person.excelWindow.persons = data.result;

				app.person.excelWindow.showPersonList();
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
	},
	showPersonList: function() {
		var persons = app.person.excelWindow.persons;

		var template = $('#tmpl-list-person-excel').html();
		var html = $m.tmpl(template, persons);
		$('#list-person-excel').html(html);
	}
};
