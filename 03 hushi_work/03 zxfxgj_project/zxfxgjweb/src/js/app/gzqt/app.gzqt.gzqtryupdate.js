app.gzqt.gzqtryupdate = {
	id: null,
	url: 'pages/gzqt/gzqtryupdate.html',

	gzqtonclickform: function() {
		$("#form-gzqtry-update").submit();
	},

	close: function() {
		app.gzqt.gzqtryupdate.clear();
		$m.page.closePage(app.gzqt.gzqtryupdate.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.gzqtryupdate.callback = null;
		app.gzqt.gzqtryupdate.vehicles = null;
	},
	init: function() {

		// $m('#form-gzqt-update').setFormValues(app.gzqt.update.obj);
		// $('#user-update-clsj').val(app.gzqt.update.obj.clsj);
		app.time.init();
		$('#window-gzqt-updateWindow').addClass('popIn');
		$('#window-gzqt-updateWindow .btn-window-close').on('click', function() {
			$('#window-gzqt-updateWindow').addClass('popOut');
			app.gzqt.gzqtryupdate.close();
		});
		app.gzqt.gzqtryupdate.initData();
	},

	initData: function() {
		app.api.gzqt.gzqtryview({
			data: {
				id: app.gzqt.gzqtryupdate.id
			},
			success: function(result) {
				console.log(result);
				$m('#form-gzqtry-update').setFormValues(result.msg);
				app.gzqt.gzqtryupdate.initForm();
			},
			error: app.api.error
		});
	},

	initForm: function() {
		$m('#form-gzqtry-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();
				console.log(data);
				app.api.gzqt.gzqtryupdate({
					data: data,
					success: function(result) {
						if (result.success == 1) {
							$m.message('保存成功');
						} else {
							$m.message('保存失败');
						}

						app.gzqt.gzqtryupdate.close();
						console.log(app.gzqt.gzqtryupdate.close);
						app.gzqt.gzqtrySearch.init();
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
