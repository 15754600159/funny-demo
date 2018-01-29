app.gzqt.gzqtrywgzupdate = {
	id: null,
	url: 'pages/gzqt/gzqtrywgzupdate.html',

	gzqtonclickform: function() {
		$("#form-gzqtrywgz-update").submit();
	},

	close: function() {
		app.gzqt.gzqtrywgzupdate.clear();
		$m.page.closePage(app.gzqt.gzqtrywgzupdate.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.gzqtrywgzupdate.callback = null;
		app.gzqt.gzqtrywgzupdate.vehicles = null;
	},
	init: function() {

		// $m('#form-gzqt-update').setFormValues(app.gzqt.update.obj);
		// $('#user-update-clsj').val(app.gzqt.update.obj.clsj);
		app.time.init();
		$('#window-gzqtwgz-updateWindow').addClass('popIn');
		$('#window-gzqtwgz-updateWindow .btn-window-close').on('click', function() {
			$('#window-gzqtwgz-updateWindow').addClass('popOut');
			app.gzqt.gzqtrywgzupdate.close();
		});
		app.gzqt.gzqtrywgzupdate.initData();
	},

	initData: function() {
		app.api.gzqt.gzqtrywgzview({
			data: {
				id: app.gzqt.gzqtrywgzupdate.id
			},
			success: function(result) {
				console.log(result);
				$m('#form-gzqtrywgz-update').setFormValues(result.msg);
				app.gzqt.gzqtrywgzupdate.initForm();
			},
			error: app.api.error
		});
	},

	initForm: function() {
		$m('#form-gzqtrywgz-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();
				console.log(data);
				app.api.gzqt.gzqtrywgzupdate({
					data: data,
					success: function(result) {
						if (result.success == 1) {
							$m.message('保存成功');
						} else {
							$m.message('保存失败');
						}

						app.gzqt.gzqtrywgzupdate.close();
						console.log(app.gzqt.gzqtrywgzupdate.close);
						app.gzqt.gzqtrywgzSearch.init();
					},
					error: app.api.error
				});
			},
			rules: {
				zdqtbh: {
					required: true,
					maxlength: 90
				},
				sfzh: {
					required: true,
					maxlength: 30
				},
				xm: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				zdqtbh: {
					required: "请输入名称",
					maxlength: '名称长度不能超过30个汉字'
				},
				sfzh: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				},
				xm: {
					required: true,
					maxlength: 30
				}
			}
		});
	},

};
