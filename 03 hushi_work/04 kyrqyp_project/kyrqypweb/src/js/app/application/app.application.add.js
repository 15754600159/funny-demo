app.application.add = {
	init: function() {
		$m('#form-application-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.application.add({
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
