app.department.update = {
	id: null,
	init: function() {
		app.department.update.initData();
	},
	initData: function() {
		app.api.department.view({
			data: {
				id: app.department.update.id
			},
			success: function(result) {
				$m('#form-department-update').setFormValues(result);
				app.department.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-department-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.department.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.department.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 90
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过30个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};
