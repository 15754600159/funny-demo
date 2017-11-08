app.role.update = {
	id: null,
	init: function() {
		app.role.update.initData();
	},
	initData: function() {
		app.api.role.view({
			data: {
				id: app.role.update.id
			},
			success: function(result) {
				$m('#form-role-update').setFormValues(result);
				app.role.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-role-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.role.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.role.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};
