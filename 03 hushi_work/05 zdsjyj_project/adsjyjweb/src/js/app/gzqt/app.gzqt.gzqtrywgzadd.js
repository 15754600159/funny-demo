app.gzqt.gzqtrywgzadd = {
	qtbh: null,
	url: 'pages/gzqt/gzqtrywgzaddWindow.html',

	gzqtonclickform: function() {
		$("#form-gzqtrywgz-add").submit();
	},

	close: function() {
		app.gzqt.gzqtrywgzadd.clear();
		$m.page.closePage(app.gzqt.gzqtrywgzadd.url, 'fade', 'container-wrapper');
	},

	init: function() {
		$('#window-gzqtrywgz-addWindow').addClass('popIn');
		$('#window-gzqtrywgz-addWindow .btn-window-close').on('click', function() {
			$('#window-gzqtrywgz-addWindow').addClass('popOut');
			app.gzqt.gzqtrywgzadd.close();
		});

		app.gzqt.gzqtrywgzadd.initForm();
		$("#gzqtrywgzadd_qtbh").val(app.gzqt.gzqtrywgzadd.qtbh);
		$m('#form-gzqtrywgz-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();
				app.api.gzqt.gzqtrywgzadd({
					data: data,
					success: function(result) {
						if (result.success == 1) {
							$m.message('保存成功');
						} else {
							$m.message('保存失败');
						}

						app.gzqt.gzqtrywgzadd.close();
						app.gzqt.gzqtrywgzSearch.init();
					},
					error: app.api.error
				});
			},
			rules: {
				sfzh: {
					required: true,
					maxlength: 90
				},
				xm: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				sfzh: {
					required: "请输入身份证号",
					maxlength: '名称长度不能超过30个汉字'
				},
				xm: {
					required: '请输入姓名',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});

	},

	clear: function() {
		app.gzqt.gzqtrywgzadd.callback = null;
		app.gzqt.gzqtrywgzadd.vehicles = null;
	},
	initForm: function() { }

};
