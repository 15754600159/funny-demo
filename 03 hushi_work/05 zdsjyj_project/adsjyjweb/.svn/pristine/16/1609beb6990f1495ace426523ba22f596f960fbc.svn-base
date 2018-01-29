app.gzqt.add = {
	type: 'group_type',
	url: 'pages/gzqt/gzqtaddWindow.html',

	gzqtonclickform: function() {
		$("#form-gzqt-add").submit();
	},

	close: function() {
		app.gzqt.add.clear();
		$m.page.closePage(app.gzqt.add.url, 'fade', 'container-wrapper');
	},
	initType: function() {
		app.api.gzqt.viewgrouptype({
			data: {
				types: app.gzqt.add.type
			},
			success: function(result) {
				console.log(result);
				app.select.initMap($('#qtlbadd_input'), result.msg.group_type);
			},
			error: app.api.error
		});
	},
	init: function() {
		app.time.init();
		$('#window-gzqt-addWindow').addClass('popIn');
		$('#window-gzqt-addWindow .btn-window-close').on('click', function() {
			$('#window-gzqt-addWindow').addClass('popOut');
			app.gzqt.add.close();
		});
		app.gzqt.add.initType()
		app.gzqt.add.initForm();

		$m('#form-gzqt-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.gzqt.add({
					data: data,
					success: function(result) {
						if (result.success == 1) {
							$m.message('保存成功');
						} else {
							$m.message('保存失败');
						}

						app.gzqt.add.close();
						app.gzqt.search.init();
					},
					error: app.api.error
				});
			},
			rules: {
				qtmc: {
					required: true,
					maxlength: 90
				},
				clsj: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				qtmc: {
					required: "请输入名称",
					maxlength: '名称长度不能超过30个汉字'
				},
				clsj: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});

	},

	clear: function() {
		app.gzqt.add.callback = null;
		app.gzqt.add.vehicles = null;
	},
	initForm: function() { }

};
