app.gzqt.gzqtryimport = {
	url: 'pages/gzqt/excelGzqtryWindow.html',
	callback: null,
	vehicles: null,
	open: function(url) {
		$m.page.openPage(app.gzqt.gzqtryimport.url, 'fade', 'container-wrapper');

		$('.gzqt_body').data('upload-gzqtry-url', url);
	},
	close: function() {
		app.gzqt.gzqtryimport.clear();
		$m.page.closePage(app.gzqt.gzqtryimport.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-excel-gzqtry-Window').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-excel-gzqtry-Window .btn-window-close').off('click').on('click', function() {
			$('#window-excel-gzqtry-Window').addClass('popOut');
			app.gzqt.gzqtryimport.close();
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
			var zdqtbh = $('#uploadExcelFile input[name="zdqtbh"]').val(),
				url = $('.gzqt_body').data('upload-gzqtry-url').replace('{zdqtbh}', zdqtbh);
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
						app.gzqt.gzqtrySearch.initSearchForm(0, 10, app.gzqt.gzqtrySearch.pagination);
					} else {
						app.alert('文件导入失败！');
					}
				},
				error: function(error) {
					app.alert('文件导入出错！' + error);
					app.loading.hide();
				}
			});

			app.gzqt.gzqtryimport.close();
		});
	},
	clear: function() {
		app.gzqt.gzqtryimport.callback = null;
		app.gzqt.gzqtryimport.vehicles = null;
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
