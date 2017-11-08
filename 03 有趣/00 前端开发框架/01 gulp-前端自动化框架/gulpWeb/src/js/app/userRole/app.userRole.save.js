app.userRole.save = {
	init: function() {
		app.userRole.save.initForm();
	},
	initForm: function() {
		$m('#form-userRole-save').validate({
			submitHandler: function(form) {
				var formData = $m(form).serializeObject();
				var roleCode = [];
				if (Object.prototype.toString.call(formData.roleCode) !== '[object Array]') {
					roleCode.push(formData.roleCode);
				} else {
					roleCode = formData.roleCode;
				}
				var data = {
					userId: formData.userId,
					roleCode: roleCode
				}
				app.api.userRole.save({
					data: data,
					success: function(result) {
						$m.message('保存成功');

						//						$m('#form-userRole-save').reset();
						//						$("#user-role-userList").find("tr").css('background-color','#fff').find('td').css('color','#000');
					},
					error: app.api.error
				});
			},
			rules: {
				userId: {
					required: true
				}
			},
			messages: {
				name: {
					required: "请选择用户"
				}
			}
		});
	},
	initData: function(userId) {
		var query = {
			pageSize: 200,
			pageNum: 0,
			userId: userId
		};
		app.api.userRole.search({
			data: query,
			success: function(result) {
				var data = {};
				data.userId = userId;
				var roleCode = [];
				for (var i = 0; i < result.datas.length; i++) {
					roleCode.push(result.datas[i].roleCode);
				}
				data.roleCode = roleCode;
				$m('#form-userRole-save').reset();
				$m('#form-userRole-save').setFormValues(data);
			}
		});
	}
}
