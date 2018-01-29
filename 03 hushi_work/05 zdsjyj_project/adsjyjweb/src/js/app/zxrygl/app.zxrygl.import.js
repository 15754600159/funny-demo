app.zxrygl.import = {
	url: 'pages/zxrygl/excelWindow.html',
	callback: null,
	vehicles: null,
	open: function(url) {
		$m.page.openPage(app.gzqt.import.url, 'fade', 'container-wrapper');

		$('.gzqt_body').data('upload-url', url);
	},
	close: function() {
		app.gzqt.import.clear();
		$m.page.closePage(app.gzqt.import.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-excelWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-excelWindow .btn-window-close').off('click').on('click', function() {
			$('#window-excelWindow').addClass('popOut');
			app.gzqt.import.close();
		});

		// 文件类型判断
		$('#fileupload').on('change', function() {
			var value = $(this).val(),
				reg = /(xls|xlsx)$/;

			if (!reg.test(value)) {
				app.alert('文件类型不符');
				$(this).val('');
			}
		})

		// 确定按钮
		$('#btn-ok-excel').on('click', function() {
			// 提交前判断
			if ($('#fileupload').val() === '') {
				app.alert('请选择文件');
				return;
			}
			var url = $('.gzqt_body').data('upload-url');
			// 文件上传
			$.ajax({
				url: url,
				type: 'POST',
				cache: false,
				data: new FormData($('#uploadExcelFile')[0]),
				processData: false,
				contentType: false,
				dataType: "json",
				beforeSend: function() {
					app.loading.show();
				},
				success: function(data) {
					app.loading.hide();
					if (data.success === 1) {
						app.alert('文件导入成功！');
						app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
					} else {
						app.alert('文件导入失败！');
					}
				},
				error: function(error) {
					app.alert('文件导入出错！' + error);
					app.loading.hide();
				}
			});

			app.gzqt.import.close();
		});
	},
	clear: function() {
		app.gzqt.import.callback = null;
		app.gzqt.import.vehicles = null;
	},
	// initFileUpload: function() {
	//     $('#fileupload').fileupload({
	//         url: '/api/personImport/import',
	//         dataType: 'json',
	//         acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
	//         autoUpload: true,
	//         messages: {
	//             maxNumberOfFiles: 'Maximum number of files exceeded',
	//             acceptFileTypes: '文件类型错误',
	//             maxFileSize: 'File is too large',
	//             minFileSize: 'File is too small'
	//         },
	//         // add: function(e, data) {
	//         //     $('#btn-ok-excel').off('click').on('click', function() {
	//         //         data.submit();
	//         //     })
	//         // },
	//         done: function(e, data) {
	//             app.loading.hide();
	//             app.person.excelWindow.persons = data.result;
	//         },
	//         always: function() {
	//             app.loading.hide();
	//         },
	//         progressall: function() {
	//             app.loading.show();
	//         },
	//         processalways: function(e, data) {
	//             app.loading.hide();
	//             var index = data.index;
	//             var file = data.files[index];
	//             if (file.error) {
	//                 app.alert(file.error);
	//             }
	//         }
	//     });
	// },

};
