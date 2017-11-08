app.application.update = {
	id: null,
	init: function() {
		app.application.update.initData();
	},
	initData: function() {
		app.api.application.view({
			data: {
				id: app.application.update.id
			},
			success: function(result) {
				$m('#form-application-update').setFormValues(result);
				app.application.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-application-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.application.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.application.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				appId: {
					required: true
				},
				appSecret: {
					required: true
				},
				name: {
					required: true,
				},
				appUrl: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				appId: {
					required: "请输入应用ID"
				},
				appSecret: {
					required: "请输入应用密码"
				},
				name: {
					required: "请输入应用名称"
				},
				appUrl: {
					required: '请输入应用地址'
				}
			}
		});
	}
};
