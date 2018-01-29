app.gzqt.update = {
	type: 'group_type',
	id: null,
	url: 'pages/gzqt/gzqtupdate.html',

	gzqtonclickform: function() {
		$("#form-gzqt-update").submit();
	},

	close: function() {
		app.gzqt.update.clear();
		$m.page.closePage(app.gzqt.update.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.update.callback = null;
		app.gzqt.update.vehicles = null;
	},
	init: function() {

		// $m('#form-gzqt-update').setFormValues(app.gzqt.update.obj);
		// $('#user-update-clsj').val(app.gzqt.update.obj.clsj);
		app.time.init();
		$('#window-gzqt-updateWindow').addClass('popIn');
		$('#window-gzqt-updateWindow .btn-window-close').on('click', function() {
			$('#window-gzqt-updateWindow').addClass('popOut');
			app.gzqt.update.close();
		});
		app.gzqt.update.initType();
		app.gzqt.update.initData();
	},

	initType: function() {
		app.api.gzqt.viewgrouptype({
			data: {
				types: app.gzqt.update.type
			},
			success: function(result) {
				console.log(result);
				app.select.initMap($('#user-add-qtlb'), result.msg.group_type);
			},
			error: app.api.error
		});
	},

	initData: function() {
		app.api.gzqt.view({
			data: {
				id: app.gzqt.update.id
			},
			success: function(result) {
				console.log(result);
				$m('#form-gzqt-update').setFormValues(result.msg);
				$m('#user-add-qtlb').val(result.msg.qtlb);
				app.gzqt.update.initForm();
			},
			error: app.api.error
		});
	},

	initForm: function() {
		$m('#form-gzqt-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();
				console.log(data);
				app.api.gzqt.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.gzqt.update.close();
						console.log(app.gzqt.update.close);
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

};
